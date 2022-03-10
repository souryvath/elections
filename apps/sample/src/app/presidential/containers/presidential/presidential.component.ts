import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-presidential',
  templateUrl: './presidential.component.html',
  styleUrls: ['./presidential.component.scss']
})
export class PresidentialComponent implements OnInit {

  subscriptionRouter: Subscription;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.subscriptionRouter = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionRouter) {
      this.subscriptionRouter.unsubscribe();
    }
  }

}
