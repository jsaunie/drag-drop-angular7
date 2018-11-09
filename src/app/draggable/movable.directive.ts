import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

interface IPosition {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {

  @Input('appMovableReset') reset = false;
  @HostBinding('class.movable') movable = true;

  public position: IPosition = {x: 0, y: 0};
  private startPosition: IPosition;

  constructor(private sanitizer: DomSanitizer, public element: ElementRef) {
    super(element);
  }

  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent) {
    console.log('start moving :', Math.round(event.clientX - this.position.x), Math.round(event.clientY - this.position.y));
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y,
    };
  }

  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
  }

  @HostListener('dragEnd', ['$event']) onDragEnd(event: PointerEvent) {
    console.log('stop moving :', Math.round(event.clientX - this.startPosition.x), Math.round(event.clientY - this.startPosition.y));
    if (this.reset) {
      this.position = {x: 0, y: 0};
    }
  }


}
