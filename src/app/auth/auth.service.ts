import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from './user.model';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  private tokenExpireTimer: any;


  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/' +
      'accounts:signUp?key=AIzaSyDcbbJDkmAKLz28RqU4WDdx75TvDWrUVoU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(tap( resData =>{
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }
  ))
  }
  login(email:string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/' +
      'accounts:signInWithPassword?key=AIzaSyDcbbJDkmAKLz28RqU4WDdx75TvDWrUVoU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap( resData =>{
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }
    ))
  }

  private handleAuthentication(email: string,userId: string, token: string, expiresIn: number){
    const expireDate = new Date(new Date().getTime() + +expiresIn * 1000)
    const user = new User(
      email,
      userId,
      token,
      expireDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpireDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpireDate));

    if (loadedUser.token){
      this.user.next(loadedUser);
      const expireDuration = new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
      this.autoLogout(expireDuration)
    }
  }

  autoLogout(expireDuration: number){
    this.tokenExpireTimer = setTimeout(this.logout, expireDuration)
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if (this.tokenExpireTimer) clearTimeout(this.tokenExpireTimer);
    this.tokenExpireTimer = null;
  }
}
