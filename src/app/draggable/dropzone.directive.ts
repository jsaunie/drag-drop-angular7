import {Directive, ElementRef, EventEmitter, HostBinding, OnInit, Output, SkipSelf} from '@angular/core';
import {DroppableService} from './droppable.service';

@Directive({
  selector: '[appDropzone]',
  providers: [DroppableService]
})
export class DropzoneDirective implements OnInit {

  @HostBinding('class.dropzone-activated') activated = false;
  @HostBinding('class.dropzone-entered') entered = false;

  @Output() drop: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>();
  @Output() remove: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>();

  private clientRect: ClientRect;

  constructor(
    @SkipSelf() private allDroppableService: DroppableService,
    private innerDroppableService: DroppableService,
    private elementRef: ElementRef,
  ) {
  }

  public ngOnInit() {
    this.allDroppableService.dragStart$.subscribe(() => this.onDragStart());
    this.allDroppableService.dragEnd$.subscribe((event: PointerEvent) => this.onDragEnd(event));

    this.allDroppableService.dragMove$.subscribe((event: PointerEvent) => {
      if (this.isEventInside(event)) {
        this.onPointerEnter();
      } else {
        this.onPointerLeave();
      }
    });

    this.innerDroppableService.dragStart$.subscribe(() => this.onInnerDragStart());
    this.innerDroppableService.dragEnd$.subscribe((event: PointerEvent) => this.onInnerDragEnd(event));
  }

  private onPointerEnter() {
    if (!this.activated) {
      return;
    }
    this.entered = true;
  }

  private onPointerLeave() {
    if (!this.activated) {
      return;
    }
    this.entered = false;
  }

  private onDragStart() {
    this.clientRect = this.elementRef.nativeElement.getBoundingClientRect();
    this.activated = true;
  }

  private onDragEnd(event: PointerEvent) {
    if (!this.activated) {
      return;
    }
    if (this.entered) {
      this.drop.emit(event);
    }
    this.activated = false;
    this.entered = false;
  }

  private onInnerDragStart() {
    this.activated = true;
    this.entered = true;
  }

  private onInnerDragEnd(event: PointerEvent) {
    if (!this.entered) {
      this.remove.emit(event);
    }
    this.activated = false;
    this.entered = false;
  }

  private isEventInside(event: PointerEvent) {
    return event.clientX >= this.clientRect.left &&
      event.clientX <= this.clientRect.right &&
      event.clientY >= this.clientRect.top &&
      event.clientX <= this.clientRect.bottom;
  }
}
