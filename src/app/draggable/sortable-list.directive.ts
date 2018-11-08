import {AfterContentInit, ContentChildren, Directive, EventEmitter, Output, QueryList} from '@angular/core';
import {SortableDirective} from './sortable.directive';

export interface ISortEvent {
  currentIndex: number;
  nextIndex: number;
}

@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit {

  @ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;

  @Output() sort: EventEmitter<ISortEvent> = new EventEmitter<ISortEvent>();

  private clientRects: ClientRect[];

  public ngAfterContentInit() {
    this.sortables.forEach((sortable: SortableDirective) => {
      sortable.dragStart.subscribe(() => this.measureClientRects());
      sortable.dragMove.subscribe((event: PointerEvent) => this.detectSorting(sortable, event));
    });
  }

  private measureClientRects() {
    this.clientRects = this.sortables.map(sortable => sortable.elementRef.nativeElement.getBoundingClientRect());
  }

  private detectSorting(sortable: SortableDirective, event: PointerEvent) {
    const currentIndex = this.sortables.toArray().indexOf(sortable);

    const prevRect = currentIndex > 0 ? this.clientRects[currentIndex - 1] : undefined;
    const nextRect = currentIndex < this.clientRects.length - 1 ? this.clientRects[currentIndex + 1] : undefined;

    if (prevRect && event.clientY < prevRect.top + prevRect.height / 2) {
      this.sort.emit({
        currentIndex,
        nextIndex: currentIndex - 1,
      });
    } else if (nextRect && event.clientY > nextRect.top + nextRect.height / 2) {
      this.sort.emit({
        currentIndex,
        nextIndex: currentIndex + 1,
      });
    }
  }
}
