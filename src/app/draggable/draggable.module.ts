import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DraggableDirective} from './draggable.directive';
import {DraggableRxDirective} from './draggable-rx.directive';
import {MovableDirective} from './movable.directive';

@NgModule({
  declarations: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
  ],
})
export class DraggableModule {
}
