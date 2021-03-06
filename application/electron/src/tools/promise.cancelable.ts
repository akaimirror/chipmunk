
export type TResolver<T> = (value: T) => void;
export type TRejector = (error: Error) => void;
export type TFinally = () => void;
export type TCanceler<T> = (reason?: T) => void;
export type TExecutor<T, C> = (resolve: TResolver<T>, reject: TRejector, cancel: TCanceler<C>, self: CancelablePromise<T, C>) => void;
export type TEventHandler = (...args: any[]) => any;

export class CancelablePromise<T, C> {

    private _resolvers: Array<TResolver<T>> = [];
    private _rejectors: TRejector[] = [];
    private _cancelers: Array<TCanceler<C>> = [];
    private _finishes: TFinally[] = [];
    private _canceled: boolean = false;
    private _resolved: boolean = false;
    private _rejected: boolean = false;
    private _finished: boolean = false;
    private _handlers: Map<string, any[]> = new Map();

    constructor(
        executor: TExecutor<T, C>,
    ) {
        const self = this;
        // Create and execute native promise
        new Promise<T>((resolve: TResolver<T>, reject: TRejector) => {
            executor(resolve, reject, this._doCancel.bind(this), self);
        }).then((value: T) => {
            this._doResolve(value);
        }).catch((error: Error) => {
            this._doReject(error);
        });
    }

    public then(callback: TResolver<T>): CancelablePromise<T, C> {
        this._resolvers.push(callback);
        return this;
    }

    public catch(callback: TRejector): CancelablePromise<T, C> {
        this._rejectors.push(callback);
        return this;
    }

    public finally(callback: TFinally): CancelablePromise<T, C> {
        this._finishes.push(callback);
        return this;
    }

    public cancel(callback: TCanceler<C>): CancelablePromise<T, C> {
        this._cancelers.push(callback);
        return this;
    }

    public break(reason: C): CancelablePromise<T, C> {
        this._doCancel(reason);
        return this;
    }

    public on(event: string, handler: TEventHandler): void {
        if (typeof event !== 'string' || event.trim() === '') {
            return;
        }
        if (typeof handler !== 'function') {
            return;
        }
        let handlers: any[] | undefined = this._handlers.get(event);
        if (handlers === undefined) {
            handlers = [];
        }
        handlers.push(handler);
        this._handlers.set(event, handlers);
    }

    public emit(event: string, ...args: any[]): void {
        const handlers: any[] | undefined = this._handlers.get(event);
        if (handlers === undefined) {
            return;
        }
        handlers.forEach((handler: TEventHandler) => {
            try {
                handler(...args);
            } catch (e) {
                this._doReject(new Error(`Promise is rejected, because handler of event "${event}" finished due error: ${e.message}`));
            }
        });
    }

    private _doResolve(value: T) {
        this._handlers.clear();
        if (this._canceled) {
            return;
        }
        this._resolved = true;
        this._resolvers.forEach((resolver: TResolver<T>) => {
            resolver(value);
        });
        this._doFinally();
    }

    private _doReject(error: Error) {
        this._handlers.clear();
        if (this._canceled) {
            return;
        }
        this._rejected = true;
        this._rejectors.forEach((rejector: TRejector) => {
            rejector(error);
        });
        this._doFinally();
    }

    private _doFinally() {
        this._handlers.clear();
        if (this._finished) {
            return;
        }
        this._finished = true;
        this._finishes.forEach((handler: TFinally) => {
            handler();
        });
    }

    private _doCancel(reason?: C) {
        this._handlers.clear();
        if (this._resolved || this._rejected || this._canceled) {
            // Doesn't make sence to cancel, because it was resolved or rejected or canceled already
            return this;
        }
        this._canceled = true;
        this._cancelers.forEach((cancler: TCanceler<C>) => {
            cancler(reason);
        });
        this._doFinally();
    }

}
