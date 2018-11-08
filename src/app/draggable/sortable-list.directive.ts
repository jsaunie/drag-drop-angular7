import {AfterContentInit, ContentChildren, Directive, EventEmitter, Output, QueryList} from '@angular/core';
import {SortableDirective} from './sortable.directive';

export interface ISortEvent {
  currentIndex: number;
  newIndex: number;
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return Math.sqrt(
    Math.pow(rectB.top - rectA.top, 2) +
    Math.pow(rectB.left - rectA.left, 2)
  );
};

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
    const currentRect = this.clientRects[currentIndex];

    this.clientRects
      .slice()
      .sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect))
      .some(rect => {
        if (rect === currentRect) {
          return false;
        }
        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ? rect.left < currentRect.left : rect.top < currentRect.top;

        let moveBack = false;
        let moveForward = false;
        if (isHorizontal) {
          moveBack = isBefore && event.clientX < rect.left + rect.width / 2;
          moveForward = !isBefore && event.clientX > rect.left + rect.width / 2;
        } else {
          moveBack = isBefore && event.clientY < rect.top + rect.height / 2;
          moveForward = !isBefore && event.clientY > rect.top + rect.height / 2;
        }

        if (moveBack || moveForward) {
          this.sort.emit({
            currentIndex,
            newIndex: this.clientRects.indexOf(rect),
          });
          return true;
        }
        return false;
      });

  }
}
