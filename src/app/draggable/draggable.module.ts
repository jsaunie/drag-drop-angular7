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
import {DropzoneDirective} from './dropzone.directive';
import {DroppableDirective} from './droppable.directive';
import {DroppableService} from './droppable.service';

@NgModule({
  declarations: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableListDirective,
    SortableDirective,
    DropzoneDirective,
    DroppableDirective,
  ],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  providers: [
    DroppableService,
  ],
  exports: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableListDirective,
    SortableDirective,
    DropzoneDirective,
    DroppableDirective,
  ],
})
export class DraggableModule {
}
