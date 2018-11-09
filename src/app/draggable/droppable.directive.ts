import {Directive, HostListener} from '@angular/core';
import {DroppableService} from './droppable.service';

@Directive({
  selector: '[appDroppable]',
})
export class DroppableDirective {

  constructor(private droppableService: DroppableService) {
  }

  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent) {
    this.droppableService.onDragStart(event);
  }

  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent) {
    this.droppableService.onDragMove(event);
  }

  @HostListener('dragEnd', ['$event']) onDragEnd(event: PointerEvent) {
    this.droppableService.onDragEnd(event);
  }
}
