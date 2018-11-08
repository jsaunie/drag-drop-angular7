import {Component} from '@angular/core';
import {ISortEvent} from './draggable/sortable-list.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public trappedBoxes = ['Trapped 1', 'Trapped 2'];
  public sortableList = ['Box 1', 'Box 2', 'Box 3', 'Box 4', 'Box 5'];

  public onDragStart() {
    console.log('got drag start');
  }

  public onDragMove(event: PointerEvent) {
    console.log('got drag Move :', Math.round(event.clientX), Math.round(event.clientY));
  }

  public onDragEnd() {
    console.log('got drag end');
  }

  public addTrappedBoxes() {
    this.trappedBoxes.push('New trapped');
  }

  public sort(event: ISortEvent) {
    const sortableList = [...this.sortableList],
      swapWith = sortableList[event.nextIndex];

    sortableList[event.nextIndex] = sortableList[event.currentIndex];
    sortableList[event.currentIndex] = swapWith;
    this.sortableList = sortableList;
  }
}
