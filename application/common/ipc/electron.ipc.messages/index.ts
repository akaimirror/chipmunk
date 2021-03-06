import { AppRestartRequest } from './app.restart.request';
export { AppRestartRequest };

import { AppRestartResponse, IAppRestartResponse } from './app.restart.response';
export { AppRestartResponse, IAppRestartResponse };

import { HostState, EHostState, IHostState } from './host.state';
export { HostState, EHostState, IHostState };

import { HostStateHistory } from './host.state.history';
export { HostStateHistory };

import { HostTask, EHostTaskState, IHostTask } from './host.task';
export { HostTask, EHostTaskState, IHostTask };

import { HostTaskHistory, IHostTaskHistory, IHostTaskHistoryItem } from './host.task.history';
export { HostTaskHistory, IHostTaskHistory, IHostTaskHistoryItem };

import { IRenderMountPlugin, RenderMountPlugin, IRenderMountPluginInfo } from './render.plugin.mount';
export { IRenderMountPlugin, RenderMountPlugin, IRenderMountPluginInfo };

import { IRenderState, RenderState, ERenderState } from './render.state';
export { IRenderState, RenderState, ERenderState };

import { PluginsInstalledRequest } from './plugins.installed.request';
export { PluginsInstalledRequest };

import { IPluginsInstalledResponse, PluginsInstalledResponse } from './plugins.installed.response';
export { IPluginsInstalledResponse, PluginsInstalledResponse };

import { PluginsIncompatiblesRequest } from './plugins.incompatibles.request';
export { PluginsIncompatiblesRequest };

import { IPluginsIncompatiblesResponse, PluginsIncompatiblesResponse } from './plugins.incompatibles.response';
export { IPluginsIncompatiblesResponse, PluginsIncompatiblesResponse };

import { PluginsStoreAvailableRequest } from './plugins.store.available.request';
export { PluginsStoreAvailableRequest };

import { IPluginsStoreAvailableResponse, PluginsStoreAvailableResponse } from './plugins.store.available.response';
export { IPluginsStoreAvailableResponse, PluginsStoreAvailableResponse };

import { IPluginInternalMessage, PluginInternalMessage } from './plugin.internal.message';
export { IPluginInternalMessage, PluginInternalMessage };

import { IPluginError, PluginError } from './plugin.error';
export { IPluginError, PluginError };

import { IPluginsInstallRequest, PluginsInstallRequest } from './plugins.install.request';
export { IPluginsInstallRequest, PluginsInstallRequest };

import { IPluginsInstallResponse, PluginsInstallResponse } from './plugins.install.response';
export { IPluginsInstallResponse, PluginsInstallResponse };

import { IPluginsUpdateRequest, PluginsUpdateRequest } from './plugins.update.request';
export { IPluginsUpdateRequest, PluginsUpdateRequest };

import { IPluginsUpdateResponse, PluginsUpdateResponse } from './plugins.update.response';
export { IPluginsUpdateResponse, PluginsUpdateResponse };

import { IPluginsUpgradeRequest, PluginsUpgradeRequest } from './plugins.upgrade.request';
export { IPluginsUpgradeRequest, PluginsUpgradeRequest };

import { IPluginsUpgradeResponse, PluginsUpgradeResponse } from './plugins.upgrade.response';
export { IPluginsUpgradeResponse, PluginsUpgradeResponse };

import { IPluginsUninstallRequest, PluginsUninstallRequest } from './plugins.uninstall.request';
export { IPluginsUninstallRequest, PluginsUninstallRequest };

import { IPluginsUninstallResponse, PluginsUninstallResponse } from './plugins.uninstall.response';
export { IPluginsUninstallResponse, PluginsUninstallResponse };

import { PluginsDataReady } from './plugins.data.ready';
export { PluginsDataReady };

import { IPluginsLogsRequest, PluginsLogsRequest } from './plugins.logs.request';
export { IPluginsLogsRequest, PluginsLogsRequest };

import { IPluginsLogsResponse, PluginsLogsResponse } from './plugins.logs.response';
export { IPluginsLogsResponse, PluginsLogsResponse };

import { IPluginsNotificationUpgrade, PluginsNotificationUpgrade } from './plugins.notification.upgrade';
export { IPluginsNotificationUpgrade, PluginsNotificationUpgrade };

import { IPluginsNotificationUpdate, PluginsNotificationUpdate } from './plugins.notification.update';
export { IPluginsNotificationUpdate, PluginsNotificationUpdate };

import { PluginAddRequest } from './plugin.add.request';
export { PluginAddRequest };

import { IPluginAddResponse, PluginAddResponse } from './plugin.add.response';
export { IPluginAddResponse, PluginAddResponse };

import { IStreamAddRequest, StreamAddRequest } from './stream.add.request';
export { IStreamAddRequest, StreamAddRequest };

import { IStreamAddResponse, StreamAddResponse } from './stream.add.responce';
export { IStreamAddResponse, StreamAddResponse };

import { IStreamSetActive, StreamSetActive } from './stream.setactive';
export { IStreamSetActive, StreamSetActive };

import { IStreamRemoveRequest, StreamRemoveRequest } from './stream.remove.request';
export { IStreamRemoveRequest, StreamRemoveRequest };

import { IStreamRemoveResponse, StreamRemoveResponse } from './stream.remove.response';
export { IStreamRemoveResponse, StreamRemoveResponse };

import { IStreamData, StreamData } from './stream.data';
export { IStreamData, StreamData };

import { IStreamUpdated, StreamUpdated } from './stream.updated.';
export { IStreamUpdated, StreamUpdated };

import { IStreamPipeState, StreamPipeState, IStreamPipeProgress } from './stream.pipe.state';
export { IStreamPipeState, StreamPipeState, IStreamPipeProgress };

import { IStreamProgressState, StreamProgressState, IStreamProgressTrack } from './stream.progress.state';
export { IStreamProgressState, StreamProgressState, IStreamProgressTrack };

import { IStreamChunk, StreamChunk } from './stream.chunk';
export { IStreamChunk, StreamChunk };

import { IStreamSourceNew, StreamSourceNew } from './stream.source.new';
export { IStreamSourceNew, StreamSourceNew };

import { IStreamResetRequest, StreamResetRequest } from './stream.reset.request';
export { IStreamResetRequest, StreamResetRequest };

import { IStreamResetResponse, StreamResetResponse } from './stream.reset.response';
export { IStreamResetResponse, StreamResetResponse };

import { IStreamPtyInRequest, StreamPtyInRequest } from './stream.pty.in.request';
export { IStreamPtyInRequest, StreamPtyInRequest };

import { IStreamPtyInResponse, StreamPtyInResponse } from './stream.pty.in.response';
export { IStreamPtyInResponse, StreamPtyInResponse };

import { IStreamPtyOutRequest, StreamPtyOutRequest } from './stream.pty.out.request';
export { IStreamPtyOutRequest, StreamPtyOutRequest };

import { IStreamPtyOutResponse, StreamPtyOutResponse } from './stream.pty.out.response';
export { IStreamPtyOutResponse, StreamPtyOutResponse };

import { IStreamPtyStreamingRequest, StreamPtyStreamingRequest } from './stream.pty.streaming.request';
export { IStreamPtyStreamingRequest, StreamPtyStreamingRequest };

import { IStreamPtyStreamingResponse, StreamPtyStreamingResponse } from './stream.pty.streaming.response';
export { IStreamPtyStreamingResponse, StreamPtyStreamingResponse };

import { IStreamPtyPendingRequest, StreamPtyPendingRequest } from './stream.pty.pending.request';
export { IStreamPtyPendingRequest, StreamPtyPendingRequest };

import { IStreamPtyPendingResponse, StreamPtyPendingResponse } from './stream.pty.pending.response';
export { IStreamPtyPendingResponse, StreamPtyPendingResponse };

import { IStreamPtyResizeRequest, StreamPtyResizeRequest } from './stream.pty.resize.request';
export { IStreamPtyResizeRequest, StreamPtyResizeRequest };

import { IStreamPtyResizeResponse, StreamPtyResizeResponse } from './stream.pty.resize.response';
export { IStreamPtyResizeResponse, StreamPtyResizeResponse };

import { ISearchResultMap, SearchResultMap, ISearchResultMapData } from './search.results.map';
export { ISearchResultMap, SearchResultMap, ISearchResultMapData };

import { ISearchChunk, SearchChunk } from './search.chunk';
export { ISearchChunk, SearchChunk };

import { ISearchUpdated, SearchUpdated } from './search.updated';
export { ISearchUpdated, SearchUpdated };

import { ISearchRequest, SearchRequest, ISearchExpression, ISearchExpressionFlags } from './search.request';
export { ISearchRequest, SearchRequest, ISearchExpression, ISearchExpressionFlags };

import { ISearchRequestCancelRequest, SearchRequestCancelRequest } from './search.request.cancel.request';
export { ISearchRequestCancelRequest, SearchRequestCancelRequest };

import { ISearchRequestCancelResponse, SearchRequestCancelResponse } from './search.request.cancel.response';
export { ISearchRequestCancelResponse, SearchRequestCancelResponse };

import { ISearchRequestResults, SearchRequestResults } from './search.request.results';
export { ISearchRequestResults, SearchRequestResults };

import { ISearchResultMapState, SearchResultMapState } from './search.results.state';
export { ISearchResultMapState, SearchResultMapState };

import { SearchRecentRequest } from './search.recent.request';
export { SearchRecentRequest };

import { ISearchRecentResponse, IRecentSearchRequest, SearchRecentResponse } from './search.recent.response';
export { ISearchRecentResponse, IRecentSearchRequest, SearchRecentResponse };

import { SearchRecentClearRequest } from './search.recent.clear.request';
export { SearchRecentClearRequest };

import { ISearchRecentClearResponse, SearchRecentClearResponse } from './search.recent.clear.response';
export { ISearchRecentClearResponse, SearchRecentClearResponse };

import { ISearchRecentAddRequest, SearchRecentAddRequest } from './search.recent.add.request';
export { ISearchRecentAddRequest, SearchRecentAddRequest };

import { ISearchRecentAddResponse, SearchRecentAddResponse } from './search.recent.add.response';
export { ISearchRecentAddResponse, SearchRecentAddResponse };

import { IFileGetOptionsRequest, FileGetOptionsRequest } from './file.getoptions.request';
export { IFileGetOptionsRequest, FileGetOptionsRequest };

import { IFileGetOptionsResponse, FileGetOptionsResponse } from './file.getoptions.response';
export { IFileGetOptionsResponse, FileGetOptionsResponse };

import { IFileOpenDoneEvent, FileOpenDoneEvent } from './file.open.done.event';
export { IFileOpenDoneEvent, FileOpenDoneEvent };

import { IFileOpenInprogressEvent, FileOpenInprogressEvent } from './file.open.inprogress.event';
export { IFileOpenInprogressEvent, FileOpenInprogressEvent };

import { IFileReadRequest, FileReadRequest } from './file.read.request';
export { IFileReadRequest, FileReadRequest };

import { IFileReadResponse, FileReadResponse } from './file.read.response';
export { IFileReadResponse, FileReadResponse };

import { IFileOpenRequest, FileOpenRequest } from './file.open.request';
export { IFileOpenRequest, FileOpenRequest };

import { IFileOpenResponse, FileOpenResponse } from './file.open.response';
export { IFileOpenResponse, FileOpenResponse };

import { IFileInfoRequest, FileInfoRequest } from './file.fileinfo.request';
export { IFileInfoRequest, FileInfoRequest };

import { IFileInfoResponse, FileInfoResponse } from './file.fileinfo.response';
export { IFileInfoResponse, FileInfoResponse };

import { IFileListRequest, FileListRequest } from './file.list.request';
export { IFileListRequest, FileListRequest };

import { IFileListResponse, FileListResponse, IFile } from './file.list.response';
export { IFileListResponse, FileListResponse, IFile };

import { IFilePickerRequest, FilePickerRequest, IFilePickerFilter } from './file.filepicker.request';
export { IFilePickerRequest, FilePickerRequest, IFilePickerFilter };

import { IFilePickerResponse, FilePickerResponse, IFilePickerFileInfo } from './file.filepicker.response';
export { IFilePickerResponse, FilePickerResponse, IFilePickerFileInfo };

import { IFilesSearchRequest, FilesSearchRequest } from './files.search.request';
export { IFilesSearchRequest, FilesSearchRequest };

import { IFilesSearchResponse, FilesSearchResponse } from './files.search.response';
export { IFilesSearchResponse, FilesSearchResponse };

import { IConcatFilesRequest, ConcatFilesRequest } from './concat.files.request';
export { IConcatFilesRequest, ConcatFilesRequest };

import { IConcatFilesResponse, ConcatFilesResponse } from './concat.files.response';
export { IConcatFilesResponse, ConcatFilesResponse };

import { FilesRecentRequest } from './files.recent.request';
export { FilesRecentRequest };

import { IFilesRecentResponse, FilesRecentResponse, IRecentFileInfo } from './files.recent.response';
export { IFilesRecentResponse, FilesRecentResponse, IRecentFileInfo };

import { FiltersFilesRecentRequest } from './files.filters.recent.request';
export { FiltersFilesRecentRequest };

import { IFiltersFilesRecentResponse, FiltersFilesRecentResponse, IRecentFilterFileInfo } from './files.filters.recent.response';
export { IFiltersFilesRecentResponse, FiltersFilesRecentResponse, IRecentFilterFileInfo };

import { FiltersFilesRecentResetRequest } from './files.filters.recent.reset.request';
export { FiltersFilesRecentResetRequest };

import { IFiltersFilesRecentResetResponse, FiltersFilesRecentResetResponse } from './files.filters.recent.reset.response';
export { IFiltersFilesRecentResetResponse, FiltersFilesRecentResetResponse };

import { IMergeFilesRequest, MergeFilesRequest, IFile as IMergeFilesRequestFile } from './merge.files.request';
export { IMergeFilesRequest, MergeFilesRequest, IMergeFilesRequestFile };

import { IMergeFilesResponse, MergeFilesResponse } from './merge.files.response';
export { IMergeFilesResponse, MergeFilesResponse };

import { IMergeFilesTestRequest, MergeFilesTestRequest } from './merge.files.test.request';
export { IMergeFilesTestRequest, MergeFilesTestRequest };

import { IMergeFilesTestResponse, MergeFilesTestResponse } from './merge.files.test.response';
export { IMergeFilesTestResponse, MergeFilesTestResponse };

import { IMergeFilesDiscoverRequest, MergeFilesDiscoverRequest } from './merge.files.discover.request';
export { IMergeFilesDiscoverRequest, MergeFilesDiscoverRequest };

import { IMergeFilesDiscoverResponse, MergeFilesDiscoverResponse, IMergeFilesDiscoverResult } from './merge.files.discover.response';
export { IMergeFilesDiscoverResponse, MergeFilesDiscoverResponse, IMergeFilesDiscoverResult };

import { MergeFilesTimezonesRequest } from './merge.files.timezone.request';
export { MergeFilesTimezonesRequest };

import { IMergeFilestimezoneResponse, MergeFilestimezoneResponse } from './merge.files.timezone.response';
export { IMergeFilestimezoneResponse, MergeFilestimezoneResponse };

import { IMergeFilesFormatRequest, MergeFilesFormatRequest } from './merge.files.format.request';
export { IMergeFilesFormatRequest, MergeFilesFormatRequest };

import { IMergeFilesFormatResponse, MergeFilesFormatResponse } from './merge.files.format.response';
export { IMergeFilesFormatResponse, MergeFilesFormatResponse };

import { FiltersLoadRequest, IFiltersLoadRequest } from './file.filters.load.request';
export { FiltersLoadRequest, IFiltersLoadRequest };

import { IFiltersLoadResponse, FiltersLoadResponse } from './file.filters.load.response';
export { IFiltersLoadResponse, FiltersLoadResponse };

import { IFiltersSaveRequest, FiltersSaveRequest, IChart as IChartSaveRequest, IFilter } from './file.filters.save.request';
export { IFiltersSaveRequest, FiltersSaveRequest, IChartSaveRequest, IFilter };

import { IFiltersSaveResponse, FiltersSaveResponse } from './file.filters.save.response';
export { IFiltersSaveResponse, FiltersSaveResponse };

import { INotification, Notification, ENotificationType, INotificationAction, ENotificationActionType } from './notification';
export { INotification, Notification, ENotificationType, INotificationAction, ENotificationActionType };

import { IHotkeyCall, HotkeyCall, EHotkeyActionRef } from './hotkey';
export { IHotkeyCall, HotkeyCall, EHotkeyActionRef };

import { HotkeyPause } from './hotkey.pause';
export { HotkeyPause };

import { HotkeyResume } from './hotkey.resume';
export { HotkeyResume };

import { HotkeyInputIn } from './hotkey.input.in';
export { HotkeyInputIn };

import { HotkeyInputOut } from './hotkey.input.out';
export { HotkeyInputOut };

import { HotkeyLocalCall, IHotkeyLocalCall } from './hotkey.local';
export { HotkeyLocalCall, IHotkeyLocalCall };

import { DLTDeamonSaveRequest, IDLTDeamonSaveRequest } from './dlt.deamon.save.request';
export { DLTDeamonSaveRequest, IDLTDeamonSaveRequest };

import { DLTDeamonSaveResponse, IDLTDeamonSaveResponse } from './dlt.deamon.save.response';
export { DLTDeamonSaveResponse, IDLTDeamonSaveResponse };

import { DLTDeamonRecentDropRequest } from './dlt.deamon.recent.drop.request';
export { DLTDeamonRecentDropRequest };

import { DLTDeamonRecentDropResponse } from './dlt.deamon.recent.drop.response';
export { DLTDeamonRecentDropResponse };

import { DLTDeamonRecentRequest } from './dlt.deamon.recent.request';
export { DLTDeamonRecentRequest };

import { IDLTDeamonRecentResponse, DLTDeamonRecentResponse, IDLTDeamonConnectionOptions } from './dlt.deamon.recent.response';
export { IDLTDeamonRecentResponse, DLTDeamonRecentResponse, IDLTDeamonConnectionOptions };

import { IDLTDeamonConnectEvent, DLTDeamonConnectEvent } from './dlt.deamon.connect.event';
export { IDLTDeamonConnectEvent, DLTDeamonConnectEvent };

import { IDLTDeamonDisconnectEvent, DLTDeamonDisconnectEvent } from './dlt.deamon.disconnect.event';
export { IDLTDeamonDisconnectEvent, DLTDeamonDisconnectEvent };

import { IDLTDeamonDisconnectRequest, DLTDeamonDisconnectRequest } from './dlt.deamon.disconnect.request';
export { IDLTDeamonDisconnectRequest, DLTDeamonDisconnectRequest };

import { IDLTDeamonDisconnectResponse, DLTDeamonDisconnectResponse } from './dlt.deamon.disconnect.response';
export { IDLTDeamonDisconnectResponse, DLTDeamonDisconnectResponse };

import { IDLTDeamonConnectRequest, DLTDeamonConnectRequest } from './dlt.deamon.connect.request';
export { IDLTDeamonConnectRequest, DLTDeamonConnectRequest };

import { IDLTDeamonConnectResponse, DLTDeamonConnectResponse } from './dlt.deamon.connect.response';
export { IDLTDeamonConnectResponse, DLTDeamonConnectResponse };

import { IDLTStatsCancelRequest, DLTStatsCancelRequest } from './dlt.filestats.cancel.request';
export { IDLTStatsCancelRequest, DLTStatsCancelRequest };

import { IDLTStatsCancelResponse, DLTStatsCancelResponse } from './dlt.filestats.cancel.response';
export { IDLTStatsCancelResponse, DLTStatsCancelResponse };

import { IDLTStatsRequest, DLTStatsRequest } from './dlt.filestats.request';
export { IDLTStatsRequest, DLTStatsRequest };

import { IDLTStatsResponse, DLTStatsResponse } from './dlt.filestats.response';
export { IDLTStatsResponse, DLTStatsResponse };

import { UpdateRequest } from './update.request';
export { UpdateRequest };

import { RenderSessionAddRequest } from './render.session.add.request';
export { RenderSessionAddRequest };

import { RenderSessionAddResponse, IRenderSessionAddResponse } from './render.session.add.response';
export { RenderSessionAddResponse, IRenderSessionAddResponse };

import { IChartRequest, IRegExpStr as IChartRegExpStr, ChartRequest } from './chart.request';
export { IChartRequest, IChartRegExpStr, ChartRequest };

import { IChartRequestCancelRequest, ChartRequestCancelRequest } from './chart.request.cancel.request';
export { IChartRequestCancelRequest, ChartRequestCancelRequest };

import { IChartRequestCancelResponse, ChartRequestCancelResponse } from './chart.request.cancel.response';
export { IChartRequestCancelResponse, ChartRequestCancelResponse };

import { IChartRequestResults, IMatch as IChartMatch, ChartRequestResults, TResults as TChartResults } from './chart.request.results';
export { IChartRequestResults, IChartMatch, ChartRequestResults, TChartResults };

import { IChartResultsUpdated, ChartResultsUpdated } from './chart.results.updated';
export { IChartResultsUpdated, ChartResultsUpdated };

import { IOutputExportFeaturesRequest, OutputExportFeaturesRequest, IOutputSelectionRange } from './output.export.features.request';
export { IOutputExportFeaturesRequest, OutputExportFeaturesRequest, IOutputSelectionRange };

import { OutputExportFeaturesResponse, IOutputExportFeaturesResponse, IExportAction } from './output.export.features.response';
export { OutputExportFeaturesResponse, IOutputExportFeaturesResponse, IExportAction };

import { IOutputExportFeatureCallRequest, OutputExportFeatureCallRequest } from './output.export.feature.call.request';
export { IOutputExportFeatureCallRequest, OutputExportFeatureCallRequest };

import { IOutputExportFeatureCallResponse, OutputExportFeatureCallResponse } from './output.export.feature.call.response';
export { IOutputExportFeatureCallResponse, OutputExportFeatureCallResponse };

import { IApplicationVersions, ITabCustomAbout, TabCustomAbout } from './tab.custom.about';
export { IApplicationVersions, ITabCustomAbout, TabCustomAbout };

import { TabCustomPlugins } from './tab.custom.plugins';
export { TabCustomPlugins };

import { TabCustomSettings } from './tab.custom.settings';
export { TabCustomSettings };

import { ChipmunkLogsRequest } from './chipmunk.logs.request';
export { ChipmunkLogsRequest }

import { IChipmunkLogsResponse, ChipmunkLogsResponse } from './chipmunk.logs.response';
export { IChipmunkLogsResponse, ChipmunkLogsResponse }

import { ChipmunkLogLevelRequest } from './chipmunk.loglevel.request';
export { ChipmunkLogLevelRequest }

import { IChipmunkLogLevelResponse, ChipmunkLogLevelResponse, ELogLevels } from './chipmunk.loglevel.response';
export { IChipmunkLogLevelResponse, ChipmunkLogLevelResponse, ELogLevels }

import { ChipmunkDevModeRequest } from './chipmunk.devmode.request';
export { ChipmunkDevModeRequest }

import { IChipmunkDevModeResponse, ChipmunkDevModeResponse } from './chipmunk.devmode.response';
export { IChipmunkDevModeResponse, ChipmunkDevModeResponse }

import { IChipmunkLogRequest, ChipmunkLogRequest } from './chipmunk.log.request';
export { IChipmunkLogRequest, ChipmunkLogRequest }

import { IChipmunkLogResponse, ChipmunkLogResponse } from './chipmunk.log.response';
export { IChipmunkLogResponse, ChipmunkLogResponse }

import { SettingsAppDataRequest } from './settings.app.data.request';
export { SettingsAppDataRequest }

import { ISettingsAppDataResponse, SettingsAppDataResponse } from './settings.app.data.response';
export { ISettingsAppDataResponse, SettingsAppDataResponse }

import { ISettingsOperationDefaultRequest, SettingsOperationDefaultRequest } from './settings.operation.default.request';
export { ISettingsOperationDefaultRequest, SettingsOperationDefaultRequest }

import { ISettingsOperationDefaultResponse, SettingsOperationDefaultResponse } from './settings.operation.default.response';
export { ISettingsOperationDefaultResponse, SettingsOperationDefaultResponse }

import { ISettingsOperationGetRequest, SettingsOperationGetRequest } from './settings.operation.get.request';
export { ISettingsOperationGetRequest, SettingsOperationGetRequest }

import { ISettingsOperationGetResponse, SettingsOperationGetResponse } from './settings.operation.get.response';
export { ISettingsOperationGetResponse, SettingsOperationGetResponse }

import { ISettingsOperationSetRequest, SettingsOperationSetRequest } from './settings.operation.set.request';
export { ISettingsOperationSetRequest, SettingsOperationSetRequest }

import { ISettingsOperationSetResponse, SettingsOperationSetResponse } from './settings.operation.set.response';
export { ISettingsOperationSetResponse, SettingsOperationSetResponse }

import { ISettingsOperationValidateRequest, SettingsOperationValidateRequest } from './settings.operation.validate.request';
export { ISettingsOperationValidateRequest, SettingsOperationValidateRequest }

import { ISettingsOperationValidateResponse, SettingsOperationValidateResponse } from './settings.operation.validate.response';
export { ISettingsOperationValidateResponse, SettingsOperationValidateResponse }

import { ISettingsRenderRegisterRequest, SettingsRenderRegisterRequest } from './settings.render.register.request';
export { ISettingsRenderRegisterRequest, SettingsRenderRegisterRequest }

import { ISettingsRenderRegisterResponse, SettingsRenderRegisterResponse } from './settings.render.register.response';
export { ISettingsRenderRegisterResponse, SettingsRenderRegisterResponse }

import { ITimestampDiscoverRequest, TimestampDiscoverRequest } from './timestamp.discover.request';
export { ITimestampDiscoverRequest, TimestampDiscoverRequest }

import { ITimestampDiscoverResponse, TimestampDiscoverResponse } from './timestamp.discover.response';
export { ITimestampDiscoverResponse, TimestampDiscoverResponse }

import { ITimestampTestRequest, TimestampTestRequest } from './timestamp.test.request';
export { ITimestampTestRequest, TimestampTestRequest }

import { ITimestampTestResponse, TimestampTestResponse } from './timestamp.test.response';
export { ITimestampTestResponse, TimestampTestResponse }

import { ITimestampExtractRequest, TimestampExtractRequest, DateTimeReplacements } from './timestamp.extract.request';
export { ITimestampExtractRequest, TimestampExtractRequest, DateTimeReplacements }

import { ITimestampExtractResponse, TimestampExtractResponse } from './timestamp.extract.response';
export { ITimestampExtractResponse, TimestampExtractResponse }

import { ITimestampExportCSVRequest, TimestampExportCSVRequest } from './timestamp.exportcsv.request';
export { ITimestampExportCSVRequest, TimestampExportCSVRequest }

import { ITimestampExportCSVResponse, TimestampExportCSVResponse } from './timestamp.exportcsv.response';
export { ITimestampExportCSVResponse, TimestampExportCSVResponse }

// Common type for expected message implementation
export type TMessage =  AppRestartRequest |
                        AppRestartResponse |
                        HostState |
                        HostStateHistory |
                        HostTask |
                        HostTaskHistory |
                        RenderMountPlugin |
                        RenderState |
                        PluginInternalMessage |
                        PluginError |
                        PluginsInstalledRequest |
                        PluginsInstalledResponse |
                        PluginsIncompatiblesRequest |
                        PluginsIncompatiblesResponse |
                        PluginsUpdateRequest |
                        PluginsUpdateResponse |
                        PluginsUpgradeRequest |
                        PluginsUpgradeResponse |
                        PluginsStoreAvailableRequest |
                        PluginsStoreAvailableResponse |
                        PluginsInstallRequest |
                        PluginsInstallResponse |
                        PluginsUninstallRequest |
                        PluginsUninstallResponse |
                        PluginsDataReady |
                        PluginsLogsRequest |
                        PluginsLogsResponse |
                        PluginsNotificationUpgrade |
                        PluginsNotificationUpdate |
                        PluginAddRequest |
                        PluginAddResponse |
                        StreamSetActive |
                        StreamAddRequest |
                        StreamAddResponse |
                        StreamRemoveRequest |
                        StreamRemoveResponse |
                        StreamData |
                        StreamUpdated |
                        StreamPipeState |
                        StreamProgressState |
                        StreamChunk |
                        StreamSourceNew |
                        StreamResetRequest |
                        StreamResetResponse |
                        StreamPtyInRequest |
                        StreamPtyInResponse |
                        StreamPtyOutRequest |
                        StreamPtyOutResponse |
                        StreamPtyStreamingRequest |
                        StreamPtyStreamingResponse |
                        StreamPtyPendingRequest |
                        StreamPtyPendingResponse |
                        StreamPtyResizeRequest |
                        StreamPtyResizeResponse |
                        SearchResultMap |
                        SearchRequest |
                        SearchRequestCancelRequest |
                        SearchRequestCancelResponse |
                        SearchRequestResults |
                        SearchResultMapState |
                        SearchUpdated |
                        SearchChunk |
                        SearchRecentRequest |
                        SearchRecentResponse |
                        SearchRecentClearRequest |
                        SearchRecentClearResponse |
                        SearchRecentAddRequest |
                        SearchRecentAddResponse |
                        FileOpenDoneEvent |
                        FileOpenInprogressEvent |
                        FileReadRequest |
                        FileReadResponse |
                        FileOpenRequest |
                        FileOpenResponse |
                        FilesSearchRequest |
                        FilesSearchResponse |
                        FilesRecentRequest |
                        FilesRecentResponse |
                        FileInfoRequest |
                        FileInfoResponse |
                        FileListRequest |
                        FileListResponse |
                        FilePickerRequest |
                        FilePickerResponse |
                        ConcatFilesRequest |
                        ConcatFilesResponse |
                        MergeFilesRequest |
                        MergeFilesResponse |
                        MergeFilesTestRequest |
                        MergeFilesTestResponse |
                        MergeFilesTimezonesRequest |
                        MergeFilestimezoneResponse |
                        MergeFilesDiscoverRequest |
                        MergeFilesDiscoverResponse |
                        MergeFilesFormatRequest |
                        MergeFilesFormatResponse |
                        FiltersLoadRequest |
                        FiltersLoadResponse |
                        FiltersSaveRequest |
                        FiltersSaveResponse |
                        FiltersFilesRecentRequest |
                        FiltersFilesRecentResponse |
                        FiltersFilesRecentResetRequest |
                        FiltersFilesRecentResetResponse |
                        Notification |
                        HotkeyCall |
                        HotkeyPause |
                        HotkeyInputIn |
                        HotkeyInputOut |
                        HotkeyResume |
                        HotkeyLocalCall |
                        DLTDeamonSaveRequest |
                        DLTDeamonSaveResponse |
                        DLTDeamonRecentDropRequest |
                        DLTDeamonRecentDropResponse |
                        DLTDeamonRecentRequest |
                        DLTDeamonRecentResponse |
                        DLTDeamonConnectEvent |
                        DLTDeamonDisconnectEvent |
                        DLTDeamonDisconnectRequest |
                        DLTDeamonDisconnectResponse |
                        DLTDeamonConnectRequest |
                        DLTDeamonConnectResponse |
                        DLTStatsRequest |
                        DLTStatsResponse |
                        DLTStatsCancelRequest |
                        DLTStatsCancelResponse |
                        UpdateRequest |
                        RenderSessionAddRequest |
                        RenderSessionAddResponse |
                        ChartRequest |
                        ChartRequestCancelRequest |
                        ChartRequestCancelResponse |
                        ChartRequestResults |
                        ChartResultsUpdated |
                        OutputExportFeaturesRequest |
                        OutputExportFeaturesResponse |
                        OutputExportFeatureCallRequest |
                        OutputExportFeatureCallResponse |
                        TabCustomAbout |
                        TabCustomPlugins |
                        TabCustomSettings |
                        ChipmunkLogsRequest |
                        ChipmunkLogsResponse |
                        ChipmunkLogLevelResponse |
                        ChipmunkDevModeRequest |
                        ChipmunkDevModeResponse |
                        ChipmunkLogRequest |
                        ChipmunkLogResponse |
                        SettingsAppDataRequest |
                        SettingsAppDataResponse |
                        SettingsOperationDefaultRequest |
                        SettingsOperationDefaultResponse<any> |
                        SettingsOperationGetRequest |
                        SettingsOperationGetResponse<any> |
                        SettingsOperationSetRequest<any> |
                        SettingsOperationSetResponse |
                        SettingsOperationValidateRequest<any> |
                        SettingsOperationValidateResponse |
                        SettingsRenderRegisterRequest<any> |
                        SettingsRenderRegisterResponse<any> |
                        TimestampDiscoverRequest |
                        TimestampDiscoverResponse |
                        TimestampTestRequest |
                        TimestampTestResponse |
                        TimestampExtractRequest |
                        TimestampExtractResponse |
                        TimestampExportCSVRequest |
                        TimestampExportCSVResponse;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Mapping of host/render events
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */
export const Map = {

    [AppRestartRequest.signature                ]: AppRestartRequest,
    [AppRestartResponse.signature               ]: AppRestartResponse,

    [HostState.signature                        ]: HostState,
    [HostStateHistory.signature                 ]: HostStateHistory,
    [HostTask.signature                         ]: HostTask,
    [HostTaskHistory.signature                  ]: HostTaskHistory,

    [RenderMountPlugin.signature                ]: RenderMountPlugin,
    [RenderState.signature                      ]: RenderState,

    [PluginInternalMessage.signature            ]: PluginInternalMessage,
    [PluginError.signature                      ]: PluginError,
    [PluginsInstalledRequest.signature          ]: PluginsInstalledRequest,
    [PluginsInstalledResponse.signature         ]: PluginsInstalledResponse,
    [PluginsIncompatiblesRequest.signature      ]: PluginsIncompatiblesRequest,
    [PluginsIncompatiblesResponse.signature     ]: PluginsIncompatiblesResponse,
    [PluginsStoreAvailableRequest.signature     ]: PluginsStoreAvailableRequest,
    [PluginsStoreAvailableResponse.signature    ]: PluginsStoreAvailableResponse,
    [PluginsInstallRequest.signature            ]: PluginsInstallRequest,
    [PluginsInstallResponse.signature           ]: PluginsInstallResponse,
    [PluginsUpdateRequest.signature             ]: PluginsUpdateRequest,
    [PluginsUpdateResponse.signature            ]: PluginsUpdateResponse,
    [PluginsUpgradeRequest.signature            ]: PluginsUpgradeRequest,
    [PluginsUpgradeResponse.signature           ]: PluginsUpgradeResponse,
    [PluginsUninstallRequest.signature          ]: PluginsUninstallRequest,
    [PluginsUninstallResponse.signature         ]: PluginsUninstallResponse,
    [PluginsDataReady.signature                 ]: PluginsDataReady,
    [PluginsLogsRequest.signature               ]: PluginsLogsRequest,
    [PluginsLogsResponse.signature              ]: PluginsLogsResponse,
    [PluginsNotificationUpgrade.signature       ]: PluginsNotificationUpgrade,
    [PluginsNotificationUpdate.signature        ]: PluginsNotificationUpdate,
    [PluginAddRequest.signature                 ]: PluginAddRequest,
    [PluginAddResponse.signature                ]: PluginAddResponse,

    [StreamSetActive.signature                  ]: StreamSetActive,
    [StreamAddRequest.signature                 ]: StreamAddRequest,
    [StreamAddResponse.signature                ]: StreamAddResponse,
    [StreamRemoveRequest.signature              ]: StreamRemoveRequest,
    [StreamRemoveResponse.signature             ]: StreamRemoveResponse,
    [StreamData.signature                       ]: StreamData,
    [StreamUpdated.signature                    ]: StreamUpdated,
    [StreamPipeState.signature                  ]: StreamPipeState,
    [StreamProgressState.signature              ]: StreamProgressState,
    [StreamChunk.signature                      ]: StreamChunk,
    [StreamSourceNew.signature                  ]: StreamSourceNew,
    [StreamResetRequest.signature               ]: StreamResetRequest,
    [StreamResetResponse.signature              ]: StreamResetResponse,
    [StreamPtyInRequest.signature               ]: StreamPtyInRequest,
    [StreamPtyInResponse.signature              ]: StreamPtyInResponse,
    [StreamPtyOutRequest.signature              ]: StreamPtyOutRequest,
    [StreamPtyOutResponse.signature             ]: StreamPtyOutResponse,
    [StreamPtyStreamingRequest.signature        ]: StreamPtyStreamingRequest,
    [StreamPtyStreamingResponse.signature       ]: StreamPtyStreamingResponse,
    [StreamPtyPendingRequest.signature          ]: StreamPtyPendingRequest,
    [StreamPtyPendingResponse.signature         ]: StreamPtyPendingResponse,
    [StreamPtyResizeRequest.signature           ]: StreamPtyResizeRequest,
    [StreamPtyResizeResponse.signature          ]: StreamPtyResizeResponse,

    [SearchResultMap.signature                  ]: SearchResultMap,
    [SearchRequest.signature                    ]: SearchRequest,
    [SearchRequestCancelRequest.signature       ]: SearchRequestCancelRequest,
    [SearchRequestCancelResponse.signature      ]: SearchRequestCancelResponse,
    [SearchRequestResults.signature             ]: SearchRequestResults,
    [SearchResultMapState.signature             ]: SearchResultMapState,
    [SearchChunk.signature                      ]: SearchChunk,
    [SearchUpdated.signature                    ]: SearchUpdated,
    [SearchRecentRequest.signature              ]: SearchRecentRequest,
    [SearchRecentResponse.signature             ]: SearchRecentResponse,
    [SearchRecentClearRequest.signature         ]: SearchRecentClearRequest,
    [SearchRecentClearResponse.signature        ]: SearchRecentClearResponse,
    [SearchRecentAddRequest.signature           ]: SearchRecentAddRequest,
    [SearchRecentAddResponse.signature          ]: SearchRecentAddResponse,

    [FileOpenDoneEvent.signature                ]: FileOpenDoneEvent,
    [FileOpenInprogressEvent.signature          ]: FileOpenInprogressEvent,
    [FileGetOptionsRequest.signature            ]: FileGetOptionsRequest,
    [FileGetOptionsResponse.signature           ]: FileGetOptionsResponse,
    [FileReadRequest.signature                  ]: FileReadRequest,
    [FileReadResponse.signature                 ]: FileReadResponse,
    [FileOpenRequest.signature                  ]: FileOpenRequest,
    [FileOpenResponse.signature                 ]: FileOpenResponse,
    [FilesSearchRequest.signature               ]: FilesSearchRequest,
    [FilesSearchResponse.signature              ]: FilesSearchResponse,
    [FilesRecentRequest.signature               ]: FilesRecentRequest,
    [FilesRecentResponse.signature              ]: FilesRecentResponse,
    [FileInfoRequest.signature                  ]: FileInfoRequest,
    [FileInfoResponse.signature                 ]: FileInfoResponse,
    [FilePickerRequest.signature                ]: FilePickerRequest,
    [FilePickerResponse.signature               ]: FilePickerResponse,
    [FileListRequest.signature                 ]: FileListRequest,
    [FileListResponse.signature                ]: FileListResponse,            

    [ConcatFilesRequest.signature               ]: ConcatFilesRequest,
    [ConcatFilesResponse.signature              ]: ConcatFilesResponse,

    [MergeFilesRequest.signature                ]: MergeFilesRequest,
    [MergeFilesResponse.signature               ]: MergeFilesResponse,
    [MergeFilesTestRequest.signature            ]: MergeFilesTestRequest,
    [MergeFilesTestResponse.signature           ]: MergeFilesTestResponse,
    [MergeFilesTimezonesRequest.signature       ]: MergeFilesTimezonesRequest,
    [MergeFilestimezoneResponse.signature       ]: MergeFilestimezoneResponse,
    [MergeFilesDiscoverRequest.signature        ]: MergeFilesDiscoverRequest,
    [MergeFilesDiscoverResponse.signature       ]: MergeFilesDiscoverResponse,
    [MergeFilesFormatRequest.signature          ]: MergeFilesFormatRequest,
    [MergeFilesFormatResponse.signature         ]: MergeFilesFormatResponse,

    [FiltersLoadRequest.signature               ]: FiltersLoadRequest,
    [FiltersLoadResponse.signature              ]: FiltersLoadResponse,
    [FiltersSaveRequest.signature               ]: FiltersSaveRequest,
    [FiltersSaveResponse.signature              ]: FiltersSaveResponse,
    [FiltersFilesRecentRequest.signature        ]: FiltersFilesRecentRequest,
    [FiltersFilesRecentResponse.signature       ]: FiltersFilesRecentResponse,
    [FiltersFilesRecentResetRequest.signature   ]: FiltersFilesRecentResetRequest,
    [FiltersFilesRecentResetResponse.signature  ]: FiltersFilesRecentResetRequest,

    [Notification.signature                     ]: Notification,

    [HotkeyCall.signature                       ]: HotkeyCall,
    [HotkeyPause.signature                      ]: HotkeyPause,
    [HotkeyResume.signature                     ]: HotkeyResume,
    [HotkeyInputIn.signature                    ]: HotkeyInputIn,
    [HotkeyInputOut.signature                   ]: HotkeyInputOut,
    [HotkeyLocalCall.signature                  ]: HotkeyLocalCall,

    [DLTDeamonSaveRequest.signature             ]: DLTDeamonSaveRequest,
    [DLTDeamonSaveResponse.signature            ]: DLTDeamonSaveResponse,
    [DLTDeamonRecentDropRequest.signature       ]: DLTDeamonRecentDropRequest,
    [DLTDeamonRecentDropResponse.signature      ]: DLTDeamonRecentDropResponse,
    [DLTDeamonRecentRequest.signature           ]: DLTDeamonRecentRequest,
    [DLTDeamonRecentResponse.signature          ]: DLTDeamonRecentResponse,
    [DLTDeamonConnectEvent.signature            ]: DLTDeamonConnectEvent,
    [DLTDeamonDisconnectEvent.signature         ]: DLTDeamonDisconnectEvent,
    [DLTDeamonDisconnectRequest.signature       ]: DLTDeamonDisconnectRequest,
    [DLTDeamonDisconnectResponse.signature      ]: DLTDeamonDisconnectResponse,
    [DLTDeamonConnectRequest.signature          ]: DLTDeamonConnectRequest,
    [DLTDeamonConnectResponse.signature         ]: DLTDeamonConnectResponse,
    [DLTStatsRequest.signature                  ]: DLTStatsRequest,
    [DLTStatsResponse.signature                 ]: DLTStatsResponse,
    [DLTStatsCancelRequest.signature            ]: DLTStatsCancelRequest,
    [DLTStatsCancelResponse.signature           ]: DLTStatsCancelResponse,

    [UpdateRequest.signature                    ]: UpdateRequest,

    [RenderSessionAddRequest.signature          ]: RenderSessionAddRequest,
    [RenderSessionAddResponse.signature         ]: RenderSessionAddResponse,

    [ChartRequest.signature                     ]: ChartRequest,
    [ChartRequestCancelRequest.signature        ]: ChartRequestCancelRequest,
    [ChartRequestCancelResponse.signature       ]: ChartRequestCancelResponse,
    [ChartRequestResults.signature              ]: ChartRequestResults,
    [ChartResultsUpdated.signature              ]: ChartResultsUpdated,

    [OutputExportFeaturesRequest.signature      ]: OutputExportFeaturesRequest,
    [OutputExportFeaturesResponse.signature     ]: OutputExportFeaturesResponse,
    [OutputExportFeatureCallRequest.signature   ]: OutputExportFeatureCallRequest,
    [OutputExportFeatureCallResponse.signature  ]: OutputExportFeatureCallResponse,

    [TabCustomAbout.signature                   ]: TabCustomAbout,
    [TabCustomPlugins.signature                 ]: TabCustomPlugins,
    [TabCustomSettings.signature                ]: TabCustomSettings,

    [ChipmunkLogsRequest.signature              ]: ChipmunkLogsRequest,
    [ChipmunkLogsResponse.signature             ]: ChipmunkLogsResponse,
    [ChipmunkLogLevelRequest.signature          ]: ChipmunkLogLevelRequest,
    [ChipmunkLogLevelResponse.signature         ]: ChipmunkLogLevelResponse,
    [ChipmunkDevModeRequest.signature           ]: ChipmunkDevModeRequest,
    [ChipmunkDevModeResponse.signature          ]: ChipmunkDevModeResponse,
    [ChipmunkLogRequest.signature               ]: ChipmunkLogRequest,
    [ChipmunkLogResponse.signature              ]: ChipmunkLogResponse,

    [SettingsAppDataRequest.signature               ]: SettingsAppDataRequest,
    [SettingsAppDataResponse.signature              ]: SettingsAppDataResponse,
    [SettingsOperationDefaultRequest.signature      ]: SettingsOperationDefaultRequest,
    [SettingsOperationDefaultResponse.signature     ]: SettingsOperationDefaultResponse,
    [SettingsOperationGetRequest.signature          ]: SettingsOperationGetRequest,
    [SettingsOperationGetResponse.signature         ]: SettingsOperationGetResponse,
    [SettingsOperationSetRequest.signature          ]: SettingsOperationSetRequest,
    [SettingsOperationSetResponse.signature         ]: SettingsOperationSetResponse,
    [SettingsOperationValidateRequest.signature     ]: SettingsOperationValidateRequest,
    [SettingsOperationValidateResponse.signature    ]: SettingsOperationValidateResponse,
    [SettingsRenderRegisterRequest.signature        ]: SettingsRenderRegisterRequest,
    [SettingsRenderRegisterResponse.signature       ]: SettingsRenderRegisterResponse,

    [TimestampDiscoverRequest.signature             ]: TimestampDiscoverRequest,
    [TimestampDiscoverResponse.signature            ]: TimestampDiscoverResponse,
    [TimestampTestRequest.signature                 ]: TimestampTestRequest,
    [TimestampTestResponse.signature                ]: TimestampTestResponse,
    [TimestampExtractRequest.signature              ]: TimestampExtractRequest,
    [TimestampExtractResponse.signature             ]: TimestampExtractResponse,
    [TimestampExportCSVRequest.signature            ]: TimestampExportCSVRequest,
    [TimestampExportCSVResponse.signature           ]: TimestampExportCSVResponse,
};
