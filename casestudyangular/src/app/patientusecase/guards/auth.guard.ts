import { CanActivateFn } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

// export const authGuard: CanActivateFn = (route, state) => {
//   return new JwtAuthGuard(new JwtHelperService()).canActivate(route, state);
// };

export class JwtAuthGuard {
  constructor(private jwtHelper: JwtHelperService) {}

  canActivate(route, state) {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }

    window.location.href = '/patientlogin';
    return false;
  }
}
