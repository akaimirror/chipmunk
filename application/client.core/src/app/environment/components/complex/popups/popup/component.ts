import { Component, Input, HostBinding, AfterContentInit } from '@angular/core';
import * as Toolkit from 'chipmunk.client.toolkit';

@Component({
    selector: 'app-popup',
    templateUrl: './template.html',
    styleUrls: ['./styles.less']
})

export class PopupComponent implements AfterContentInit {

    @Input() public popup: Toolkit.IPopup = { caption: '', message: '' };

    @HostBinding('style.width') width = '24rem';
    @HostBinding('style.margin-left') marginLeft = '-12rem';

    @Input() public onClose: (...args: any[]) => any = () => {};

    public ngAfterContentInit() {
        if (this.popup.options === undefined) {
            return;
        }
        if (this.popup.options.width !== undefined) {
            this.width = `${this.popup.options.width}rem`;
            this.marginLeft = `-${this.popup.options.width / 2}rem`;
        }
    }

}
