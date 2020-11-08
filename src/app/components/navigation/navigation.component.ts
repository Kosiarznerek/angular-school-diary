import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Routes, UrlSegment} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, take} from 'rxjs/operators';

interface IMenuItem {
  displayName: string;
  description: string;
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

  public onSignOutButtonClickHandler(): void {
    this.router.navigate(['/']);
  }

  public get currentMenuItem(): Omit<IMenuItem, 'children'> {
    return NavigationComponent
      .flatMenuItems(this.menuItems)
      .find(v => v.routerLink === this.router.url);
  }

  private static flatMenuItems(items: IMenuItem[]): Omit<IMenuItem, 'children'>[] {
    return items.reduce((p, c) => {
      if (c.children.length > 0) {
        return p.concat(NavigationComponent.flatMenuItems(c.children));
      } else {
        return p.concat(c);
      }
    }, []);
  }

  private static toMenuItems(pathFromRoot: string, routes: Routes): IMenuItem[] {
    return routes
      .filter(v => v.component || v.children)
      .map(route => ({
        displayName: route.data.displayName,
        description: route.data.description,
        routerLink: `${pathFromRoot}/${route.path}`,
        children: this.toMenuItems(`${pathFromRoot}/${route.path}`, route.children || [])
      }));
  }

}
