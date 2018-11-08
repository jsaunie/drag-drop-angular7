import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>();
  @Output() dragMove: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>();
  @Output() dragEnd: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>();

  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent): void {
    this.dragging = true;
    this.dragStart.next(event);
  }

  @HostListener('document:pointermove', ['$event']) onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.next(event);
  }

  @HostListener('document:pointerup', ['$event']) onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    this.dragEnd.next(event);
  }

}
