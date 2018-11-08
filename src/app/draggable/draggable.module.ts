import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DraggableDirective} from './draggable.directive';
import {DraggableRxDirective} from './draggable-rx.directive';
import {MovableDirective} from './movable.directive';
import {MovableAreaDirective} from './movable-area.directive';
import {DraggableHelperDirective} from './draggable-helper.directive';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    DraggableDirective,
    DraggableRxDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
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
  ],
})
export class DraggableModule {
}
