import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public trappedBoxes = ['Trapped 1', 'Trapped 2'];

  public onDragStart() {
    console.log('got drag start');
  }

  public onDragMove(event: PointerEvent) {
    console.log('got drag Move :', Math.round(event.clientX), Math.round(event.clientY));
  }

  public onDragEnd() {
    console.log('got drag end');
  }

  public addTrappedBoxes(){
    this.trappedBoxes.push('New trapped');
  }
}
