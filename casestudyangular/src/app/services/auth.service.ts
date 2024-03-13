import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedIn: boolean = false;

  

  constructor() { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    // Perform authentication logic if needed
    this.loggedIn = true;
  }

  logout(): void {
    // Perform logout logic if needed
    this.loggedIn = false;
  }
}
