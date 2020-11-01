import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Routes, UrlSegment} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, take} from 'rxjs/operators';

interface IMenuItem {
  displayName: string;
  routerLink: string;
  children: IMenuItem[];
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public readonly menuItems: IMenuItem[];
  public readonly isHandset$: Observable<boolean>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly breakpointObserver: BreakpointObserver,
  ) {

    this.menuItems = [];
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    );
  }

  async ngOnInit(): Promise<void> {
    const pathFromRoot: string = await forkJoin(
      this.activatedRoute.pathFromRoot.map(v => v.url.pipe(take(1)))
    ).pipe(map(p => p
      .flat(Infinity)
      .map((v: UrlSegment): string => v.path)
      .filter(v => v !== '')
      .join()
    )).toPromise();

    this.menuItems.push(...NavigationComponent.toMenuItems(
      `/${pathFromRoot}`,
      this.activatedRoute.routeConfig.children
    ));
  }

  private static toMenuItems(pathFromRoot: string, routes: Routes): IMenuItem[] {
    return routes
      .filter(v => v.component || v.children)
      .map((route, i) => ({
        displayName: route.data.displayName,
        routerLink: `${pathFromRoot}/${route.path}`,
        children: this.toMenuItems(`${pathFromRoot}/${route.path}`, route.children || [])
      }));
  }

  public onSignOutButtonClickHandler(): void {
    this.router.navigate(['/']);
  }

}
