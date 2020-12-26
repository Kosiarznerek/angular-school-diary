import {Injectable} from '@angular/core';
import {IUserCredentials} from '../services/sign-in/sign-in.service.models';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private readonly router: Router,
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.isAuthenticated(state) && state.url !== '/sign-in') {
      await this.router.navigate(['/sign-in']);
      return false;
    } else {
      return true;
    }
  }

  private isAuthenticated(state: RouterStateSnapshot): boolean {
    if (state.url.startsWith('/administrator')) {
      return this.credentials?.type === 'administrator';
    } else if (state.url.startsWith('/student')) {
      return this.credentials?.type === 'student';
    } else if (state.url.startsWith('/parent')) {
      return this.credentials?.type === 'parent';
    } else if (state.url.startsWith('/teacher')) {
      return this.credentials?.type === 'teacher';
    } else {
      return state.url === '/sign-in';
    }
  }

  public set credentials(c: IUserCredentials) {
    localStorage.setItem('authentication', JSON.stringify(c));
  }

  public get credentials(): IUserCredentials {
    return JSON.parse(localStorage.getItem('authentication'));
  }

}
