import * as Toolkit from 'chipmunk.client.toolkit';
import { EHostCommands, EHostEvents } from '../common/host.events';
import { IOptions } from '../common/interface.options';
import { Observable, Subject } from 'rxjs';
import { IPortInfo, IPortState } from '../common/interface.portinfo';
import { SidebarTitleAddComponent } from '../views/dialog/titlebar/components';

export class Service extends Toolkit.APluginService {

    public state:  {[port: string]: IPortState} = {};
    public savedSession = new Map<string, { default: string, ports: IPortInfo[]}>();

    private api: Toolkit.IAPI | undefined;
    private session: string;
    private sessions: string[] = [];
    private _subscriptions: { [key: string]: Toolkit.Subscription } = {};
    private _sessionConnected: {[session: string]: {[port: string]: IPortState}} = {};
    private _logger: Toolkit.Logger = new Toolkit.Logger(`Plugin: serial: inj_output_bot:`);
    private _openQueue: {[port: string]: boolean} = {};
    private _messageQueue: {[port: string]: string[]} = {};
    private _subjects = {
        event: new Subject<any>(),
    };

    constructor() {
        super();
        this._subscriptions.onAPIReady = this.onAPIReady.subscribe(this._onAPIReady.bind(this));
    }

    private _onAPIReady() {
        this.api = this.getAPI();
        if (this.api === undefined) {
            // error message
            return;
        }
        this._subscriptions.onSessionOpen = this.api.getSessionsEventsHub().subscribe().onSessionOpen(this._onSessionOpen.bind(this));
        this._subscriptions.onSessionClose = this.api.getSessionsEventsHub().subscribe().onSessionClose(this._onSessionClose.bind(this));
    }

    private _onSessionOpen() {
        this.session = this.api.getActiveSessionId();
        if (this.sessions.includes(this.session)) {
            return;
        }
        if (this.sessions.length === 0) {
            this.incomeMessage();
        }
        this.sessions.push(this.session);
    }

    private _onSessionClose(guid: string) {
        this.sessions = this.sessions.filter(session => session !== guid);
        this.savedSession.delete(guid);
        if (this.sessions.length === 0) {
            this.destroy();
        }
    }

    public getObservable(): {
        event: Observable<any>,
    } {
        return {
            event: this._subjects.event.asObservable(),
        };
    }

    public destroy() {
        Object.keys(this._subscriptions).forEach((key: string) => {
            this._subscriptions[key].unsubscribe();
        });
        Object.keys(this._subjects).forEach((key: string) => {
            this._subjects[key].unsubscribe();
        });
    }


    public incomeMessage() {
        this._subscriptions.incomeIPCHostMessage = this.api.getIPC().subscribeToHost((message: any) => {
            if (typeof message !== 'object' && message === null) {
                return;
            }
            if (message.streamId !== this.session && message.streamId !== '*') {
                return;
            }
            if (message.event === EHostEvents.state) {
                this._saveLoad(message.state).then((response: {[port: string]: IPortState}) => {
                    if (response === undefined) {
                        return;
                    }
                    this.state = response;
                    this._subjects.event.next(message);
                }).catch((error: Error) => {
                    this._logger.error(error);
                });
                return;
            }
            this._subjects.event.next(message);
        });
    }

    private _saveLoad(ports: { [key: string]: IPortState }) {
        return new Promise((resolve) => {
            if (Object.keys(this._sessionConnected).length > 0) {
                Object.keys(this._sessionConnected).forEach(session => {
                    Object.keys(this._sessionConnected[session]).forEach(port => {
                        if (ports[port]) {
                            this._sessionConnected[session][port].ioState.read += ports[port].ioState.read;
                        }
                    });
                });
                resolve(this._sessionConnected[this.session]);
            }
        }).catch((error: Error) => {
            this._logger.error(error);
        });
    }

    private emptyQueue(port: string) {
        if (this._messageQueue[port]) {
            this._messageQueue[port].forEach((message) => {
                this.sendMessage(message, port);
            });
        }
    }

    public connect(options: IOptions): Promise<void> {
        return this.api.getIPC().requestToHost({
            stream: this.session,
            command: EHostCommands.open,
            options: options,
        }, this.session).then(() => {
            if (this._sessionConnected[this.session] === undefined) {
                this._sessionConnected[this.session] = {};
            }
            if (this._sessionConnected[this.session][options.path] === undefined) {
                this._sessionConnected[this.session][options.path] =  {connections: 0, ioState: { written: 0, read: 0}};
            }
            this._openQueue[options.path] = true;
            this.emptyQueue(options.path);
        });
    }

    public disconnect(port: string): Promise<any> {
        return this.api.getIPC().requestToHost({
            stream: this.session,
            command: EHostCommands.close,
            path: port,
        }, this.session).then(() => {
            this._openQueue[port] = false;
            this._sessionConnected[this.session][port] = undefined;
        });
    }

    public requestPorts() {
        return this.api.getIPC().requestToHost({
            stream: this.session,
            command: EHostCommands.list,
        }, this.session);
    }

    public startSpy(options: IOptions[]) {
        return this.api.getIPC().requestToHost({
            stream: this.session,
            command: EHostCommands.spyStart,
            options: options,
        }, this.session);
    }

    public stopSpy(options: IOptions[]) {
        return this.api.getIPC().requestToHost({
            stream: this.session,
            command: EHostCommands.spyStop,
            options: options,
        }, this.session);
    }

    public sendMessage(message: string, port: string) {
        return this.api.getIPC().requestToHost({
            stream: this.session,
            command: EHostCommands.write,
            cmd: message,
            path: port
        }, this.session);
    }

    public popupButton(action: Function) {
        this.api.setSidebarTitleInjection({
            factory: SidebarTitleAddComponent,
            inputs: {
                _ng_addPort: action,
            }
        });
    }

    public closePopup(popup: string) {
        this.api.removePopup(popup);
    }
}

export default (new Service());