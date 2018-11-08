import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DraggableDirective} from './draggable.directive';
import {DraggableRxDirective} from './draggable-rx.directive';

@NgModule({
  declarations: [
    DraggableDirective,
    DraggableRxDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DraggableDirective,
    DraggableRxDirective,
  ],
})
export class DraggableModule {
}
