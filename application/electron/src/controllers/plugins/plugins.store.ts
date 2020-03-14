// tslint:disable:max-classes-per-file

import * as path from 'path';
import * as FS from '../../tools/fs';
import * as fs from 'fs';

import Logger from '../../tools/env.logger';
import ServicePaths from '../../services/service.paths';
import ServiceElectronService from '../../services/service.electron.state';
import ServicePackage, { IDependencies } from '../../services/service.package';

import GitHubClient, { IReleaseAsset, IReleaseData, GitHubAsset } from '../../tools/env.github.client';

import { getPlatform, EPlatforms } from '../../tools/env.os';
import { download } from '../../tools/env.net';
import { CommonInterfaces } from '../../interfaces/interface.common';

const CSettings: {
    user: string,
    repo: string,
    registerListFile: string,
} = {
    user: 'esrlabs',
    repo: 'chipmunk-plugins-store',
    registerListFile: 'releases-{platform}.json',
};

export interface IPluginReleaseInfo {
    name: string;
    url: string;
    version: string;
    hash: string;
    phash: string;
    default: boolean;
    signed: boolean;
    dependencies: IDependencies;
    display_name: string;
    description: string;
    readme: string;
    icon: string;
    file: string;
}

/**
 * @class ControllerPluginStore
 * @description Delivery default plugins into logviewer folder
 */

export default class ControllerPluginStore {

    private _logger: Logger = new Logger(`ControllerPluginStore ("${CSettings.user}/${CSettings.repo}")`);
    private _remote: Map<string, IPluginReleaseInfo> | undefined = undefined;
    private _local: Map<string, IPluginReleaseInfo> = new Map();

    public local(): Promise<void> {
        return new Promise((resolve) => {
            this._getLocal().then((plugins: Map<string, IPluginReleaseInfo>) => {
                this._local = plugins;
                resolve();
            }).catch((error: Error) => {
                this._logger.warn(`Fail to get plugin's register due error: ${error.message}`);
                resolve();
            });
        });
    }

    public remote(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._getRemote().then((plugins: Map<string, IPluginReleaseInfo>) => {
                this._remote = plugins;
                resolve();
            }).catch((error: Error) => {
                this._logger.warn(`Fail to get plugin's register due error: ${error.message}`);
                resolve();
            });
        });
    }

    public getInfo(name: string): IPluginReleaseInfo | undefined {
        return this._remote === undefined ? this._local.get(name) : this._remote.get(name);
    }

    public download(name: string): Promise<string> {
        return new Promise((resolve, reject) => {
            ServiceElectronService.logStateToRender(`Downloading plugin "${name}"...`);
            // Check plugin info
            const plugin: IPluginReleaseInfo | undefined = this.getInfo(name);
            if (plugin === undefined) {
                return reject(new Error(this._logger.warn(`Plugin "${name}" isn't found.`)));
            }
            // Check plugin in default folder (before download)
            this._getFromIncluded(plugin).then((filename: string) => {
                this._logger.debug(`Plugin "${name}" was taken from included plugins in ${ServicePaths.getIncludedPlugins()}`);
                resolve(filename);
            }).catch((inclErr: Error) => {
                this._logger.warn(`Fail to get plugin package from included (${ServicePaths.getIncludedPlugins()}) due error: ${inclErr.message}`);
                // Download plugin
                const target: string = path.resolve(ServicePaths.getPlugins(), plugin.file);
                FS.unlink(target).then(() => {
                    download(plugin.url, target).then(() => {
                        fs.stat(target, (statErr: NodeJS.ErrnoException | null, stat: fs.Stats) => {
                            if (statErr) {
                                return reject(new Error(this._logger.warn(`Fail download file "${target}" due error: ${statErr.message}`)));
                            }
                            ServiceElectronService.logStateToRender(`Plugin "${name}" is downloaded`);
                            this._logger.env(`Plugin "${name}" is downloaded:\n\t- file: ${target}\n\t- size: ${stat.size} bytes`);
                        });
                        resolve(target);
                    }).catch((downloadErr: Error) => {
                        reject(new Error(this._logger.warn(`Fail to remove file "${target}" due error: ${downloadErr.message}`)));
                    });
                    /*
                    const writer = fs.createWriteStream(target);
                    const request = https.get(plugin.url, (response) => {
                        response.pipe(writer);
                        writer.on('finish', () => {
                            fs.stat(target, (statErr: NodeJS.ErrnoException | null, stat: fs.Stats) => {
                                if (statErr) {
                                    return reject(new Error(this._logger.warn(`Fail download file "${target}" due error: ${statErr.message}`)));
                                }
                                ServiceElectronService.logStateToRender(`Plugin "${name}" is downloaded`);
                                this._logger.env(`Plugin "${name}" is downloaded:\n\t- file: ${target}\n\t- size: ${stat.size} bytes`);
                            });
                            resolve(target);
                        });
                    }).on('error', (error) => { // Handle errors
                        FS.unlink(target).catch((unlinkErr: Error) => {
                            reject(new Error(this._logger.warn(`Fail to remove file "${target}" due error: ${unlinkErr.message}`)));
                        }).finally(() => {
                            ServiceElectronService.logStateToRender(`Fail download plugin "${name}"`);
                            reject(error);
                        });
                    });*/
                }).catch((unlinkErr: Error) => {
                    reject(new Error(this._logger.warn(`Fail to remove file "${target}" due error: ${unlinkErr.message}`)));
                });
            });
        });
    }

    public getDefaults(exclude: string[]): IPluginReleaseInfo[] {
        return Array.from(this.getRegister().values()).filter((plugin: IPluginReleaseInfo) => {
            if (plugin.hash !== ServicePackage.getHash()) {
                this._logger.warn(`Default plugin "${plugin.name}" could not be installed, because hash dismatch.\n\t- plugin hash: ${plugin.hash}\n\t- chipmunk hash: ${ServicePackage.getHash()}`);
                return false;
            }
            return true;
        }).filter((plugin: IPluginReleaseInfo) => {
            return exclude.indexOf(plugin.name) === -1 && plugin.default;
        });
    }

    public getAvailable(): CommonInterfaces.Plugins.IPlugin[] {
        return Array.from(this.getRegister().values()).map((plugin: IPluginReleaseInfo) => {
            return {
                name: plugin.name,
                url: plugin.url,
                file: plugin.file,
                version: plugin.version,
                display_name: plugin.display_name,
                description: plugin.description,
                readme: plugin.readme,
                icon: plugin.icon,
            };
        });
    }

    public getRegister(): Map<string, IPluginReleaseInfo> {
        return this._remote === undefined ? this._local : this._remote;
    }

    private _getFromIncluded(plugin: IPluginReleaseInfo): Promise<string> {
        return new Promise((resolve, reject) => {
            const filename: string = path.resolve(ServicePaths.getIncludedPlugins(), plugin.file);
            FS.exist(filename).then((exist: boolean) => {
                if (!exist) {
                    return reject(new Error(`Plugin "${filename}" isn't found.`));
                }
                const dest: string = path.resolve(ServicePaths.getPlugins(), plugin.file);
                fs.copyFile(filename, dest, (err: NodeJS.ErrnoException | null) => {
                    if (err) {
                        return reject(filename);
                    }
                    resolve(dest);
                });
            }).catch((error: Error) => {
                reject(error);
            });
        });
    }

    private _getRemote(): Promise<Map<string, IPluginReleaseInfo>> {
        return new Promise((resolve, reject) => {
            ServiceElectronService.logStateToRender(`Getting plugin's store state.`);
            GitHubClient.getLatestRelease({ user: CSettings.user, repo: CSettings.repo }).then((release: IReleaseData) => {
                if (release.map === undefined) {
                    return reject(new Error(this._logger.warn(`Plugins-store repo doesn't have any assets in latest release.`)));
                }
                const filename: string = this._getRegisterFileName();
                const asset: GitHubAsset | undefined = release.map.get(filename);
                if (asset === undefined) {
                    return reject(new Error(this._logger.warn(`Fail to find "${filename}" in assets of latest release.`)));
                }
                asset.get().then((buf: Buffer) => {
                    try {
                        const list: IPluginReleaseInfo[] = JSON.parse(buf.toString());
                        if (!(list instanceof Array)) {
                            return reject(new Error(this._logger.warn(`Incorrect format of asseets`)));
                        }
                        const plugins: Map<string, IPluginReleaseInfo> = new Map();
                        list.forEach((plugin: IPluginReleaseInfo) => {
                            plugins.set(plugin.name, plugin);
                        });
                        ServiceElectronService.logStateToRender(`Information of last versions of plugins has been gotten`);
                        resolve(plugins);
                    } catch (e) {
                        return reject(new Error(this._logger.warn(`Fail parse asset to JSON due error: ${e.message}`)));
                    }
                }).catch((assetErr: Error) => {
                    this._logger.warn(`Fail get asset due error: ${assetErr.message}`);
                    reject(assetErr);
                });
            }).catch((error: Error) => {
                reject(new Error(this._logger.warn(`Fail get latest release due error: ${error.message}`)));
            });
        });
    }

    private _getLocal(): Promise<Map<string, IPluginReleaseInfo>> {
        return new Promise((resolve, reject) => {
            const local: string = path.resolve(ServicePaths.getIncludedPlugins(), this._getRegisterFileName());
            FS.exist(local).then((exist: boolean) => {
                if (!exist) {
                    return reject(new Error(`Fail to find local register "${local}"`));
                }
                FS.readTextFile(local).then((json: string) => {
                    try {
                        const list: IPluginReleaseInfo[] = JSON.parse(json);
                        if (!(list instanceof Array)) {
                            return reject(new Error(this._logger.warn(`Incorrect format of asseets`)));
                        }
                        const plugins: Map<string, IPluginReleaseInfo> = new Map();
                        list.forEach((plugin: IPluginReleaseInfo) => {
                            plugins.set(plugin.name, plugin);
                        });
                        ServiceElectronService.logStateToRender(`Information of last versions of plugins has been gotten`);
                        resolve(plugins);
                    } catch (e) {
                        return reject(new Error(this._logger.warn(`Fail parse asset to JSON due error: ${e.message}`)));
                    }
                }).catch((readErr: Error) => {
                    reject(readErr);
                });
            }).catch((exErr: Error) => {
                reject(exErr);
            });
        });
    }

    private _getRegisterFileName(): string {
        return CSettings.registerListFile.replace('{platform}', getPlatform(true));
    }

}