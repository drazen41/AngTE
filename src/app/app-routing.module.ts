import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RatingsComponent} from './ratings/ratings.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RatingDetailComponent} from './rating-detail/rating-detail.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:country', component: RatingDetailComponent },
  {path:'ratings',component:RatingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
