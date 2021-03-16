import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userLoggedIn = false;
  private userSub: Subscription;

  constructor(private storageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.userLoggedIn = !!user;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onSaveData(){
    this.storageService.onSave();
  }
  onFetchData(){
    this.storageService.onFetch();
  }
  onLogout(){
    this.authService.logout()
  }
}
