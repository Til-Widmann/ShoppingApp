import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping-app';

  @Input()
  currentNavStatus = 'recipe';

  onNavStatusChange(status: string){
    this.currentNavStatus = status
  }
}
