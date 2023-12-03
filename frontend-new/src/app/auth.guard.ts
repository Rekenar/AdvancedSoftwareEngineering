import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    public authService: AuthService,
    public router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isLoggedIn) {
      console.log("not-logged-in");
      window.alert('Zugriff nicht erlaubt! Keine aktive Session vorhanden. Bitte melden Sie sich erneut an.');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
