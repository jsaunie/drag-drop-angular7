import {Component} from '@angular/core';
import {ISortEvent} from './draggable/sortable-list.directive';

function remove(item: string, list: string[]) {
  if (list.indexOf(item) !== -1) {
    list.splice(list.indexOf(item), 1);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public trappedBoxes = ['Trapped 1', 'Trapped 2'];
  public sortableList = [
    'Box 1',
    'Box 2',
    'Box 3',
    'Box 4',
    'Box 5',
    'Box 6',
    'Box 7',
    'Box 8',
    'Box 9',
    'Box 10',
  ];
  public availableBoxes = [
    'Box 1',
    'Box 2',
    'Box 3',
    'Box 4',
  ];
  public dropzone1 = [
    'Box 5',
    'Box 6',
  ];
  public dropzone2 = [
    'Box 7',
  ];

  public currentBox?: string;

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
      swapWith = sortableList[event.newIndex];

    sortableList[event.newIndex] = sortableList[event.currentIndex];
    sortableList[event.currentIndex] = swapWith;
    this.sortableList = sortableList;
  }

  public move(box: string, array: string[]) {
    remove(box, this.availableBoxes);
    remove(box, this.dropzone1);
    remove(box, this.dropzone2);

    array.push(box);
  }

}
