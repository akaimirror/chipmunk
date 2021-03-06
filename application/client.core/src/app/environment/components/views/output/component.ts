import { Component, OnDestroy, ChangeDetectorRef, ViewContainerRef, AfterViewInit, ViewChild, Input, AfterContentInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ControllerSessionTab, IInjectionAddEvent, IInjectionRemoveEvent } from '../../../controller/controller.session.tab';
import { ControllerSessionTabMap } from '../../../controller/controller.session.tab.map';
import { ControllerSessionTabStreamOutput, IStreamPacket, IStreamState, ILoadedRange } from '../../../controller/controller.session.tab.stream.output';
import { ControllerComponentsDragDropFiles } from '../../../controller/components/controller.components.dragdrop.files';
import { IDataAPI, IRange, IRow, IRowsPacket, IStorageInformation, ComplexScrollBoxComponent, IScrollBoxSelection } from 'chipmunk-client-material';
import { ViewOutputRowComponent, IScope } from '../row/component';
import { NotificationsService, ENotificationType } from '../../../services.injectable/injectable.service.notifications';
import { cleanupOutput } from '../row/helpers';
import { IMenuItem } from '../../../services/standalone/service.contextmenu';
import { ISelectionParser } from '../../../services/standalone/service.selection.parsers';
import { IExportAction } from '../../../services/standalone/service.output.exports';
import { FilterRequest } from '../../../controller/controller.session.tab.search.filters.storage';
import { IPCMessages } from '../../../interfaces/interface.ipc';
import { CDefaultTabsGuids } from '../../../services/service.sessions.toolbar';

import PluginsService from '../../../services/service.plugins';
import ContextMenuService from '../../../services/standalone/service.contextmenu';
import SelectionParsersService from '../../../services/standalone/service.selection.parsers';
import OutputExportsService from '../../../services/standalone/service.output.exports';
import ViewsEventsService from '../../../services/standalone/service.views.events';
import FileOpenerService from '../../../services/service.file.opener';
import EventsHubService from '../../../services/standalone/service.eventshub';
import ToolbarSessionsService from '../../../services/service.sessions.toolbar';
import OutputRedirectionsService from '../../../services/standalone/service.output.redirections';

import * as Toolkit from 'chipmunk.client.toolkit';

const CSettings: {
    preloadCount: number,
} = {
    preloadCount: 100
};

@Component({
    selector: 'app-views-output',
    templateUrl: './template.html',
    styleUrls: ['./styles.less'],
})

export class ViewOutputComponent implements OnDestroy, AfterViewInit, AfterContentInit {

    @ViewChild(ComplexScrollBoxComponent) _scrollBoxCom: ComplexScrollBoxComponent;

    @Input() public session: ControllerSessionTab | undefined;

    public _ng_outputAPI: IDataAPI;
    public _ng_injections: {
        bottom: Map<string, Toolkit.IComponentInjection>,
        top: Map<string, Toolkit.IComponentInjection>,
    } = {
        bottom: new Map(),
        top: new Map(),
    };
    public _ng_mapService: ControllerSessionTabMap;

    private _subscriptions: { [key: string]: Subscription | undefined } = { };
    private _output: ControllerSessionTabStreamOutput | undefined;
    private _dragdrop: ControllerComponentsDragDropFiles | undefined;
    private _destroyed: boolean = false;
    private _logger: Toolkit.Logger = new Toolkit.Logger('ViewOutputComponent');
    private _controls: {
        keepScrollDown: boolean,
    } = {
        keepScrollDown: true,
    };

    constructor(private _cdRef: ChangeDetectorRef,
                private _vcRef: ViewContainerRef,
                private _notifications: NotificationsService) {
        this._ng_outputAPI = {
            getLastFrame: this._api_getLastFrame.bind(this),
            getComponentFactory: this._api_getComponentFactory.bind(this),
            getItemHeight: this._api_getItemHeight.bind(this),
            getRange: this._api_getRange.bind(this),
            getStorageInfo: this._api_getStorageInfo.bind(this),
            updatingDone: this._api_updatingDone.bind(this),
            cleanUpClipboard: this._api_cleanUpClipboard.bind(this),
            onSourceUpdated: new Subject<void>(),
            onStorageUpdated: new Subject<IStorageInformation>(),
            onScrollTo: new Subject<number>(),
            onScrollUntil: new Subject<number>(),
            onRowsDelivered: new Subject<IRowsPacket>(),
            onRerequest: new Subject<void>(),
            onRedraw: new Subject<void>(),
        };
    }

    ngAfterViewInit() {
        if (this._scrollBoxCom === undefined || this._scrollBoxCom === null) {
            return;
        }
        this._subscriptions.onScrolled = this._scrollBoxCom.getObservable().onScrolled.subscribe(this._onScrolled.bind(this));
        this._subscriptions.onOffset = this._scrollBoxCom.getObservable().onOffset.subscribe(this._onOffset.bind(this));
        this._dragdrop = new ControllerComponentsDragDropFiles(this._vcRef.element.nativeElement);
        this._subscriptions.onFiles = this._dragdrop.getObservable().onFiles.subscribe(this._onFilesDropped.bind(this));
        this._subscriptions.onKeepScrollPrevent = EventsHubService.getObservable().onKeepScrollPrevent.subscribe(this._onKeepScrollPrevent.bind(this));
        // Set focus
        this._scrollBoxCom.setFocus();
    }

    ngAfterContentInit() {
        if (this.session === undefined) {
            return;
        }
        // Get reference to stream wrapper
        this._output = this.session.getSessionStream().getOutputStream();
        // Get injections
        this._ng_injections.bottom = this.session.getOutputInjections(Toolkit.EViewsTypes.outputBottom);
        this._ng_injections.top = this.session.getOutputInjections(Toolkit.EViewsTypes.outputTop);
        // Make subscriptions
        this._subscriptions.onStateUpdated = this._output.getObservable().onStateUpdated.subscribe(this._onStateUpdated.bind(this));
        this._subscriptions.onRangeLoaded = this._output.getObservable().onRangeLoaded.subscribe(this._onRangeLoaded.bind(this));
        this._subscriptions.onReset = this._output.getObservable().onReset.subscribe(this._onReset.bind(this));
        this._subscriptions.onScrollTo = this._output.getObservable().onScrollTo.subscribe(this._onScrollTo.bind(this));
        this._subscriptions.onResize = ViewsEventsService.getObservable().onResize.subscribe(this._onResize.bind(this));
        this._subscriptions.onOutputInjectionAdd = this.session.getObservable().onOutputInjectionAdd.subscribe(this._inj_onOutputInjectionAdd.bind(this));
        this._subscriptions.onOutputInjectionRemove = this.session.getObservable().onOutputInjectionRemove.subscribe(this._inj_onOutputInjectionRemove.bind(this));
        // Get map service
        this._ng_mapService = this.session.getStreamMap();
        // Other events
        this._subscriptions.onRepainted = this._ng_mapService.getObservable().onRepainted.subscribe(this._onResize.bind(this));
    }

    public ngOnDestroy() {
        this._destroyed = true;
        Object.keys(this._subscriptions).forEach((key: string) => {
            this._subscriptions[key].unsubscribe();
        });
        if (this._dragdrop !== undefined) {
            this._dragdrop.destroy();
        }
    }

    public _ng_onContexMenu(event: MouseEvent) {
        if (this._scrollBoxCom === undefined || this._scrollBoxCom === null) {
            return;
        }
        const selection: IScrollBoxSelection | undefined = this._scrollBoxCom.getSelection();
        const contextRowNumber: number = SelectionParsersService.getContextRowNumber();
        const current: IStreamPacket | undefined = contextRowNumber !== -1 ? this._output.getRowByPosition(contextRowNumber) : undefined;
        const items: IMenuItem[] = [
            {
                caption: 'Copy',
                handler: () => {
                    this._scrollBoxCom.copySelection();
                },
                disabled: selection === undefined,
            },
            { /* delimiter */ },
            {
                caption: `Clear output`,
                handler: this._ctrl_onCleanOutput.bind(this),
            },
            {
                caption: `Keep scrolling: ${this._controls.keepScrollDown ? 'enabled' : 'disabled'}`,
                handler: this._ctrl_onScrollDown.bind(this),
            },
        ];
        if (selection === undefined) {
            window.getSelection().removeAllRanges();
        }
        if (current !== undefined) {
            items.push(...[
                { /* delimiter */ },
                {
                    caption: `Show row #${contextRowNumber}`,
                    handler: () => {
                        SelectionParsersService.memo(current.str, `Row #${contextRowNumber}`);
                    },
                },
            ]);
        }
        if (selection !== undefined) {
            const parsers: ISelectionParser[] = SelectionParsersService.getParsers(selection.selection);
            if (parsers.length > 0) {
                items.push(...[
                    { /* delimiter */ },
                    ...parsers.map((parser: ISelectionParser) => {
                        return {
                            caption: parser.name,
                            handler: () => {
                                SelectionParsersService.parse(selection.selection, parser.guid, parser.name);
                            }
                        };
                    })
                ]);
            }
        }
        items.push(...[
            { /* delimiter */ },
            {
                caption: 'Search with selection',
                handler: () => {
                    const filter: FilterRequest | undefined = this._getFilterFromStr(selection.selection);
                    if (filter === undefined) {
                        return;
                    }
                    this.session.getSessionSearch().search(filter);
                },
                disabled: selection === undefined || this._getFilterFromStr(selection.selection) === undefined
            }
        ]);
        OutputExportsService.getActions(this.session.getGuid()).then((actions: IExportAction[]) => {
            if (actions.length > 0) {
                items.push(...[
                    { /* delimiter */ },
                    ...actions.map((action: IExportAction) => {
                        return {
                            caption: action.caption,
                            handler: action.caller
                        };
                    })
                ]);
            }
        }).catch((err: Error) => {
            this._logger.warn(`Fail get actions due error: ${err.message}`);
        }).finally(() => {
            if (this.session.getTimestamp().isDetected()) {
                let curr: {
                    tm?: number,
                    pos?: number,
                    row?: { position: number, str: string },
                } | undefined = current !== undefined ? {
                    tm: undefined,
                    pos: current.position,
                    row: { position: current.position, str: current.str },
                } : undefined;
                let selRanges = OutputRedirectionsService.getSelectionRanges(this.session.getGuid());
                if (selRanges === undefined) {
                    selRanges = [];
                }
                selRanges = selRanges.filter((range) => {
                    return range.content !== undefined && range.start !== range.end;
                }).map((range: any) => {
                    range.tm = {
                        start: undefined,
                        end: undefined,
                    };
                    return range;
                });
                Promise.all([
                    this.session.getTimestamp().getTimestamp(curr !== undefined ? curr.row.str : undefined).then((_tm: number | undefined) => {
                        curr.tm = _tm;
                    }).catch((err: Error) => {
                        curr = undefined;
                        this._logger.error(`Fail extract timestamp due error: ${err.message}`);
                    }),
                    ...selRanges.map((range: any) => {
                        return this.session.getTimestamp().getTimestamp(range.content.start).then((_tm: number | undefined) => {
                            range.tm.start = _tm;
                        }).catch((err: Error) => {
                            this._logger.error(`Fail extract timestamp due error: ${err.message}`);
                        });
                    }),
                    ...selRanges.map((range: any) => {
                        return this.session.getTimestamp().getTimestamp(range.content.end).then((_tm: number | undefined) => {
                            range.tm.end = _tm;
                        }).catch((err: Error) => {
                            this._logger.error(`Fail extract timestamp due error: ${err.message}`);
                        });
                    }),
                ]).catch((err: Error) => {
                    this._logger.error(`Detection of timestams wend with error: ${err.message}`);
                }).finally(() => {
                    selRanges = selRanges.filter((range: any) => {
                        return range.tm.start !== undefined && range.tm.end !== undefined;
                    });
                    if (selRanges.length > 0) {
                        items.push(...[
                            { /* delimiter */ },
                            {
                                caption: `Create range${selRanges.length > 1 ? 's' : ''} by ${selRanges.length > 1 ? `${selRanges.length} ` : ''}selection${selRanges.length > 1 ? 's' : ''}.`,
                                handler: () => {
                                    if (!ToolbarSessionsService.has(CDefaultTabsGuids.timemeasurement)) {
                                        ToolbarSessionsService.setActive(CDefaultTabsGuids.timemeasurement);
                                    }
                                    this.session.getTimestamp().drop();
                                    selRanges.forEach((range) => {
                                        this.session.getTimestamp().addRange(
                                            { position: range.start, str: range.content.start },
                                            { position: range.end, str: range.content.end },
                                        );
                                    });
                                },
                            }
                        ]);
                    }
                    if (curr !== undefined) {
                        const opened = this.session.getTimestamp().getOpenRow();
                        if (opened !== undefined || curr.tm !== undefined) {
                            items.push(...[
                                { /* delimiter */ },
                            ]);
                        }
                        if (opened !== undefined) {
                            opened.position !== curr.pos && items.push(...[
                                {
                                    caption: `Add time range ${opened.position} - ${curr.row.position}`,
                                    handler: () => {
                                        this.session.getTimestamp().close(curr.row).catch((err: Error) => {
                                            this._logger.warn(`Error during time range close: ${err.message}`);
                                        }).finally(() => {
                                            this.session.getTimestamp().open(curr.row, true);
                                        });
                                    },
                                },
                                {
                                    caption: `Close time range ${opened.position} - ${curr.row.position}`,
                                    handler: () => {
                                        this.session.getTimestamp().close(curr.row);
                                    },
                                },
                            ]);
                            items.push(...[
                                {
                                    caption: `Drop opened time range`,
                                    handler: () => {
                                        this.session.getTimestamp().drop();
                                    },
                                }
                            ]);
                        } else if (curr.tm !== undefined) {
                            items.push(...[
                                {
                                    caption: `Start time range`,
                                    handler: () => {
                                        if (!ToolbarSessionsService.has(CDefaultTabsGuids.timemeasurement)) {
                                            ToolbarSessionsService.setActive(CDefaultTabsGuids.timemeasurement);
                                        }
                                        this.session.getTimestamp().open(curr.row);
                                    },
                                }
                            ]);
                        }
                    }
                    const selected: number | undefined = this.session.getTimestamp().getRangeIdByPosition(current.position);
                    if (this.session.getTimestamp().getRanges().length > 0) {
                        if (selected !== undefined) {
                            items.push(...[
                                { /* delimiter */ },
                                {
                                    caption: `Remove this range`,
                                    handler: () => {
                                        this.session.getTimestamp().removeRange(selected);
                                    },
                                },
                                {
                                    caption: `Remove all except selected`,
                                    handler: () => {
                                        this.session.getTimestamp().clear([selected]);
                                    },
                                }
                            ]);
                            items.push(...[
                                {
                                    caption: `Remove all ranges`,
                                    handler: () => {
                                        this.session.getTimestamp().clear();
                                    },
                                },
                            ]);
                        }
                    }
                    ContextMenuService.show({
                        items: items,
                        x: event.pageX,
                        y: event.pageY,
                    });
                });
            } else {
                items.push(...[
                    { /* delimiter */ },
                    {
                        caption: 'Open time measurement view',
                        handler: () => {
                            ToolbarSessionsService.setActive(CDefaultTabsGuids.timemeasurement);
                        },
                    }
                ]);
                ContextMenuService.show({
                    items: items,
                    x: event.pageX,
                    y: event.pageY,
                });
            }
        });
    }

    private _api_getComponentFactory(): any {
        return ViewOutputRowComponent;
    }

    private _api_getItemHeight(): number {
        return 16;
    }

    private _api_getLastFrame(): IRange {
        return this._output.getFrame();
    }

    private _api_getRange(range: IRange, antiLoopCounter: number = 0): IRowsPacket {
        const rows: IStreamPacket[] | Error = this._output.getRange(range);
        if (rows instanceof Error) {
            if (antiLoopCounter > 1000) {
                throw rows;
            }
            return this._api_getRange(range, antiLoopCounter + 1);
        }
        return {
            range: range,
            rows: rows
        };
    }

    private _api_getStorageInfo(): IStorageInformation {
        return {
            count: this._output.getState().count
        };
    }

    private _api_updatingDone(range: IRange): void {
        this._output.setFrame(range);
    }

    private _api_cleanUpClipboard(str: string): string {
        return cleanupOutput(str);
    }

    private _getFilterFromStr(str: string): FilterRequest | undefined {
        try {
            return new FilterRequest({
                request: str,
                flags: { casesensitive: true, wholeword: true, regexp: false },
            });
        } catch (e) {
            return undefined;
        }
    }

    private _onReset() {
        this._ng_outputAPI.onStorageUpdated.next({
            count: 0
        });
    }

    private _onStateUpdated(state: IStreamState) {
        this._ng_outputAPI.onStorageUpdated.next({
            count: state.count
        });
        this._keepScrollDown();
    }

    private _onRangeLoaded(packet: ILoadedRange) {
        this._ng_outputAPI.onRowsDelivered.next({
            range: packet.range,
            rows: packet.rows,
        });
    }

    private _onScrollTo(row: number) {
        this._ng_outputAPI.onScrollTo.next(row);
    }

    private _onResize() {
        this._forceUpdate();
        this._ng_outputAPI.onRedraw.next();
    }

    private _onScrolled(range: IRange) {
        const last: number = this._output.getRowsCount() - 1;
        if (range.end === last && !this._controls.keepScrollDown) {
            this._controls.keepScrollDown = true;
        } else if (range.end < last && this._controls.keepScrollDown) {
            this._controls.keepScrollDown = false;
        }
    }

    private _onOffset(offset: number) {
        this._output.setHorScrollOffset(offset);
    }

    private _onFilesDropped(files: IPCMessages.IFile[]) {
        FileOpenerService.open(files).catch((error: Error) => {
            this._notifications.add({
                caption: 'Error opening file',
                message: error.message,
                options: {
                    type: ENotificationType.error
                }
            });
        });
    }

    private _onKeepScrollPrevent() {
        this._controls.keepScrollDown = false;
    }

    private _keepScrollDown() {
        if (this._scrollBoxCom === undefined || this._scrollBoxCom === null) {
            return;
        }
        if (!this._controls.keepScrollDown) {
            return;
        }
        const last: number = this._output.getRowsCount() - 1;
        const range: IRange = {
            start: last - CSettings.preloadCount < 0 ? 0 : (last - CSettings.preloadCount),
            end: last
        };
        const frame: IRange = this._scrollBoxCom.getFrame();
        if (frame.end === range.end) {
            return;
        }
        this._output.preload(range).then((loaded: IRange | null) => {
            if (loaded === null) {
                // Already some request is in progress: do nothing
                return;
            }
            this._ng_outputAPI.onScrollUntil.next(loaded.end);
        }).catch((error: Error) => {
            // Do nothing, no data available
        });
    }

    private _ctrl_onScrollDown() {
        this._controls.keepScrollDown = !this._controls.keepScrollDown;
        if (this._scrollBoxCom === undefined || this._scrollBoxCom === null) {
            return;
        }
        const last: number = this._output.getRowsCount() - 1;
        if (this._controls.keepScrollDown && this._scrollBoxCom.getFrame().end < last) {
            this._onScrollTo(last);
        }
    }

    private _ctrl_onCleanOutput() {
        if (this.session === undefined) {
            return;
        }
        this.session.resetSessionContent().catch((error: Error) => {
            return this._notifications.add({
                caption: 'Session',
                message: `Fail to reset session due error: ${error.message}`
            });
        });
    }

    private _getInjections(type: Toolkit.EViewsTypes): Map<string, Toolkit.IComponentInjection> | undefined {
        let injections: Map<string, Toolkit.IComponentInjection> | undefined;
        switch (type) {
            case Toolkit.EViewsTypes.outputTop:
                injections = this._ng_injections.top;
                break;
            case Toolkit.EViewsTypes.outputBottom:
                injections = this._ng_injections.bottom;
                break;
        }
        return injections;
    }

    private _inj_onOutputInjectionAdd(event: IInjectionAddEvent) {
        // Get injections storage
        const injections: Map<string, Toolkit.IComponentInjection> | undefined = this._getInjections(event.type);
        if (injections === undefined) {
            return false;
        }
        // Check is injection already exist
        if (injections.has(event.injection.id)) {
            return;
        }
        // Check factory
        if (typeof event.injection.factory.name === 'string') {
            // This reference to component, but not factory of it (check plugins)
            const factory = PluginsService.getStoredFactoryByName(event.injection.factory.name);
            if (factory !== undefined) {
                event.injection.factory = factory;
                event.injection.resolved = true;
            } else {
                event.injection.resolved = false;
            }
        } else {
            // Will try to use as it is
            event.injection.resolved = false;
        }
        if (event.injection.factory === undefined) {
            return;
        }
        // Add new injection
        injections.set(event.injection.id, event.injection);
        this._forceUpdate();
    }

    private _inj_onOutputInjectionRemove(event: IInjectionRemoveEvent) {
        // Get injections storage
        const injections: Map<string, Toolkit.IComponentInjection> | undefined = this._getInjections(event.type);
        if (injections === undefined) {
            return false;
        }
        // Check is injection already exist
        if (!injections.has(event.id)) {
            return;
        }
        injections.delete(event.id);
        this._forceUpdate();
    }

    private _forceUpdate() {
        if (this._destroyed) {
            return;
        }
        this._cdRef.detectChanges();
    }

}
