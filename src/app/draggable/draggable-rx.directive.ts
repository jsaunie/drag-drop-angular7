import {Directive, EventEmitter, HostBinding, HostListener, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {repeat, switchMap, take, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appDraggableRx]'
})
export class DraggableRxDirective implements OnInit {

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>();
  @Output() dragMove: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>();
  @Output() dragEnd: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>();

  private pointerDown: Subject<PointerEvent> = new Subject<PointerEvent>();
  private pointerMove: Subject<PointerEvent> = new Subject<PointerEvent>();
  private pointerUp: Subject<PointerEvent> = new Subject<PointerEvent>();

  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent) {
    this.pointerDown.next(event);
  }

  @HostListener('document:pointermove', ['$event']) onPointerMove(event: PointerEvent) {
    this.pointerMove.next(event);
  }

  @HostListener('document:pointerup', ['$event']) onPointerUp(event: PointerEvent) {
    this.pointerUp.next(event);
  }

  public ngOnInit() {
    // Stream of dragStart
    this.pointerDown.asObservable()
      .subscribe((event: PointerEvent) => {
        this.dragging = true;
        this.dragStart.emit(event);
      });

    // Stream of dragMove
    this.pointerMove.pipe(
      switchMap(() => this.pointerMove),
      takeUntil(this.pointerUp),
      repeat()
    ).subscribe((event: PointerEvent) => this.dragMove.emit(event));

    // Stream of dragEnd
    this.pointerDown.pipe(
      switchMap(() => this.pointerUp),
      take(1),
      repeat()
    ).subscribe((event: PointerEvent) => {
      this.dragging = false;
      this.dragEnd.emit(event);
    });
  }

}
