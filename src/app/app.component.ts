import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public onDragStart() {
    console.log('got drag start');
  }

  public onDragMove(event: PointerEvent) {
    console.log('got drag Move :', Math.round(event.clientX), Math.round(event.clientY));
  }

  public onDragEnd() {
    console.log('got drag end');
  }
}
