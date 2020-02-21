import { NgModule                               } from '@angular/core';
import { CommonModule                           } from '@angular/common';

import { SidebarAppNotificationsComponent       } from './component';
import { SidebarAppNotificationComponent        } from './notification/component';
import { SidebarAppNotificationsCounterComponent} from './counter/component';

import { PrimitiveModule, ContainersModule      } from 'chipmunk-client-material';

const entryComponents = [ SidebarAppNotificationsComponent, SidebarAppNotificationComponent, SidebarAppNotificationsCounterComponent ];
const components = [ ...entryComponents ];

@NgModule({
    entryComponents : [ ...entryComponents ],
    imports         : [ CommonModule, PrimitiveModule, ContainersModule ],
    declarations    : [ ...components ],
    exports         : [ ...components ]
})

export class SidebarAppNotificationsModule {
    constructor() {
    }
}
