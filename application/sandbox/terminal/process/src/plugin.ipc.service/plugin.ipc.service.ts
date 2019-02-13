import * as FS from 'fs';
import { EventEmitter } from 'events';
import { IMessagePackage, IPCMessagePackage } from './plugin.ipc.service.message';
import Subscription, { THandler } from './tools.subscription';
import * as IPCMessages from './ipc.messages/index';
import guid from './tools.guid';

export { IPCMessages };

/**
 * @class PluginIPCService
 * @description Service provides communition between plugin's process and parent (main) process
 * @notes Parent (main) process attach plugin's process as fork with next FDs:
 *      { fd: 0 } stdin     doesn't used by parent process
 *      { fd: 1 } stdout    listened by parent process. Whole output from it goes to logs of parent process
 *      { fd: 2 } stderr    listened by parent process. Whole output from it goes to logs of parent process
 *      { fd: 3 } ipc       used by parent process as command sender / reciever
 *      { fd: 4 } pipe      listened by parent process. Used as bridge to data's stream. All data from this 
 *                          stream are redirected into session stream of parent process
 * @recommendations
 *      - to parse logs use simple "console.log (warn, err etc)" or you can write it directly to stdout
 *      - parent process nothig send to process.stdin ( fd: 0 )
 *      - ipc channel ({ fd: 3 }) are using to exchange commands, but not data. Data should be send via stream
 *      - pipe channel ({ fd: 4 }) are using to send stream's data to parent. In only in one way: plugin -> parent. 
 *        To work with this channel WriteStream is created. Developer are able:
 *        a) use method of this service "sendToStream" to send chunk of data
 *        b) get stream using "getDataStream" and pipe it with source of data
 *      - use event "message" to get commands from parent process
 *      - plugin process doesn't have direct access to render process; communication via render and main process
 *        goes via main process: [plugin -> main (parent) -> render] and [render -> main (parent) -> plugin]
 */
export class PluginIPCService extends EventEmitter {

    private _stream: FS.WriteStream;
    private _pending: Map<string, (message: IPCMessages.TMessage) => any> = new Map();
    private _subscriptions: Map<string, Subscription> = new Map();
    private _handlers: Map<string, Map<string, THandler>> = new Map();

    public static Events = {
        close: 'close',
    };

    public Events = PluginIPCService.Events;

    constructor() {
        super();
        // Check IPC (to communicate with parent process)
        if (process.send === void 0) {
            throw new Error(`Fail to init plugin, because IPC interface isn't available. Expecting 'ipc' on "fd:3"`);
        }
        // Create data's stream (to send data to main output stream)
        this._stream = FS.createWriteStream('', { fd: 4 });
        // Listen parent process for messages
        process.on('message', this._onMessage.bind(this));
    }

    /**
     * Sends message to parent (main) process via IPC without expecting any answer
     * @param {IPCMessages.TMessage} data package of data
     * @returns { Promise<void> }
     */
    public send(message: IPCMessages.TMessage): Promise<IPCMessages.TMessage | undefined> {
        return new Promise((resolve, reject) => {
            const ref: Function | undefined = this._getRefToMessageClass(message);
            if (ref === undefined) {
                return reject(new Error(`Incorrect type of message`));
            }
            const messagePackage: IPCMessagePackage = new IPCMessagePackage({
                message: message,
            });
            this._send(messagePackage).then(() => {
                resolve();
            }).catch((sendingError: Error) => {
                reject(sendingError);
            });
        });
    }

    public response(sequence: string, message: IPCMessages.TMessage): Promise<IPCMessages.TMessage | undefined> {
        return new Promise((resolve, reject) => {
            const ref: Function | undefined = this._getRefToMessageClass(message);
            if (ref === undefined) {
                return reject(new Error(`Incorrect type of message`));
            }
            const messagePackage: IPCMessagePackage = new IPCMessagePackage({
                message: message,
                sequence: sequence
            });
            this._send(messagePackage).then(() => {
                resolve();
            }).catch((sendingError: Error) => {
                reject(sendingError);
            });
        });
    }

    /**
     * Sends message to parent (main) process via IPC and waiting for a answer
     * @param {IPCMessages.TMessage} data package of data
     * @returns { Promise<IPCMessages.TMessage | undefined> }
     */
    public request(message: IPCMessages.TMessage): Promise<IPCMessages.TMessage | undefined> {
        return new Promise((resolve, reject) => {
            const ref: Function | undefined = this._getRefToMessageClass(message);
            if (ref === undefined) {
                return reject(new Error(`Incorrect type of message`));
            }
            const messagePackage: IPCMessagePackage = new IPCMessagePackage({
                message: message,
            });
            this._send(messagePackage, true).then((response: IPCMessages.TMessage | undefined) => {
                resolve(response);
            }).catch((sendingError: Error) => {
                reject(sendingError);
            });
        });
    }

    public subscribe(message: Function, handler: THandler): Promise<Subscription> {
        return new Promise((resolve, reject) => {
            if (!this._isValidMessageClassRef(message)) {
                return reject(new Error(`Incorrect reference to message class.`));
            }
           
            const signature: string = (message as any).signature;
            const subscriptionId: string = guid();
            let handlers: Map<string, THandler> | undefined = this._handlers.get(signature);
            if (handlers === undefined) {
                handlers = new Map();
            }
            handlers.set(subscriptionId, handler);
            this._handlers.set(signature, handlers);
            const subscription: Subscription = new Subscription(signature, () => {
                this._unsubscribe(signature, subscriptionId);
            }, subscriptionId);
            this._subscriptions.set(subscriptionId, subscription);
            resolve(subscription);
        });
    }

    /**
     * Sends chunk of data to main data's stream 
     * @param {any} chunk package of data
     * @returns { Promise<void> }
     */
    public sendToStream(chunk: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this._stream.write(chunk, (error: Error | null | undefined) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    /**
     * Returns write stream. Can be used to pipe write stream with source of data 
     * @returns { FS.WriteStream }
     */
    public getDataStream(): FS.WriteStream {
        return this._stream;
    }

    /**
     * Sends message to parent (main) process via IPC
     * @param {IPCMessage} data package of data
     * @param {boolean} expectResponse  true - promise will be resolved with income message with same "sequence"; 
     *                                  false (default) - promise will be resolved afte message be sent 
     * @returns { Promise<IPCMessage | undefined> }
     */
    private _send(message: IPCMessagePackage, expectResponse: boolean = false): Promise<IPCMessages.TMessage | undefined> {
        return new Promise((resolve, reject) => {
            if (!process.send) {
                return reject(new Error(`IPC isn't available`));
            }
            if (!(message instanceof IPCMessagePackage)) {
                return reject(new Error(`Expecting as message instance of IPCMessagePackage`));
            }
            if (expectResponse) {
                this._pending.set(message.sequence, resolve);
            }
            process.send(message, (error: Error) => {
                if (error) {
                    return reject(error);
                }
                if (!expectResponse) {
                    return resolve();
                }
            });
        });
    }

    /**
     * Handler of incoming message from parent (main) process 
     * @returns void
     */
    private _onMessage(data: any) {
        try {
            const message: IPCMessagePackage = new IPCMessagePackage(data);
            const resolver = this._pending.get(message.sequence);
            this._pending.delete(message.sequence);
            const refMessageClass = this._getRefToMessageClass(message.message);
            if (refMessageClass === undefined) {
                throw new Error(`Cannot find ref to class of message`);
            }
            const instance: IPCMessages.TMessage = new (refMessageClass as any)(message.message);
            if (resolver !== undefined) {
                return resolver(instance);
            }
            const handlers = this._handlers.get(instance.signature);
            if (handlers === undefined) {
                return;
            }
            handlers.forEach((handler: THandler) => {
                handler(instance, this.response.bind(this, message.sequence));
            });
        } catch (e) {
            console.log(`Incorrect format of IPC message: ${typeof data}. Error: ${e.message}`);
        }
    }

    private _getRefToMessageClass(message: IPCMessages.TMessage): Function | undefined {
        let ref: Function | undefined;
        Object.keys(IPCMessages.Map).forEach((alias: string) => {
            if (ref) {
                return;
            }
            if (message instanceof (IPCMessages.Map as any)[alias] || message.signature === (IPCMessages.Map as any)[alias].signature) {
                ref = (IPCMessages.Map as any)[alias];
            }
        });
        return ref;
    }

    private _isValidMessageClassRef(messageRef: Function): boolean {
        let result: boolean = false;
        if (typeof (messageRef as any).signature !== 'string' || (messageRef as any).signature.trim() === '') {
            return false;
        }
        Object.keys(IPCMessages.Map).forEach((alias: string) => {
            if (result) {
                return;
            }
            if ((messageRef as any).signature === (IPCMessages.Map as any)[alias].signature) {
                result = true;
            }
        });
        return result;
    }

    private _unsubscribe(signature: string, subscriptionId: string) {
        this._subscriptions.delete(subscriptionId);
        const handlers: Map<string, THandler> | undefined = this._handlers.get(signature);
        if (handlers === undefined) {
            return;
        }
        handlers.delete(subscriptionId);
        if (handlers.size === 0) {
            this._handlers.delete(signature);
        } else {
            this._handlers.set(signature, handlers);
        }
    }

}

export default (new PluginIPCService());