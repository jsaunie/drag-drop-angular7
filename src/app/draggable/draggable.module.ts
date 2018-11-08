import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DraggableDirective} from './draggable.directive';
import {DraggableRxDirective} from './draggable-rx.directive';
import {MovableDirective} from './movable.directive';
import {MovableAreaDirective} from './movable-area.directive';
import {DraggableHelperDirective} from './draggable-helper.directive';
import {OverlayModule} from '@angular/cdk/overlay';
import {SortableListDirective} from './sortable-list.directive';
import {SortableDirective} from './sortable.directive';

@NgModule({
  declarations: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableListDirective,
    SortableDirective,
  ],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableListDirective,
    SortableDirective,
  ],
})
export class DraggableModule {
}
