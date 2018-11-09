import {Injectable, Optional, SkipSelf} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class DroppableService {

  public dragStart$: Observable<PointerEvent>;
  public dragMove$: Observable<PointerEvent>;
  public dragEnd$: Observable<PointerEvent>;

  private dragStartSubject: Subject<PointerEvent> = new Subject<PointerEvent>();
  private dragMoveSubject: Subject<PointerEvent> = new Subject<PointerEvent>();
  private dragEndSubject: Subject<PointerEvent> = new Subject<PointerEvent>();

  constructor(@SkipSelf() @Optional() private parent?: DroppableService) {
    this.dragStart$ = this.dragStartSubject.asObservable();
    this.dragMove$ = this.dragMoveSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
  }

  public onDragStart(event: PointerEvent) {
    this.dragStartSubject.next(event);

    if (this.parent) {
      this.parent.onDragStart(event);
    }
  }

  public onDragMove(event: PointerEvent) {
    this.dragMoveSubject.next(event);

    if (this.parent) {
      this.parent.onDragMove(event);
    }
  }

  public onDragEnd(event: PointerEvent) {
    this.dragEndSubject.next(event);

    if (this.parent) {
      this.parent.onDragEnd(event);
    }
  }

}
