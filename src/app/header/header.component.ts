import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  navEvent = new EventEmitter<string>();

  dropdownOpen = false;
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(nav: string){
    this.navEvent.emit(nav)
  }

}
