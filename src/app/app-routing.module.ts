import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RatingsComponent} from './ratings/ratings.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RatingDetailComponent} from './rating-detail/rating-detail.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:country', component: RatingDetailComponent },
  {path:'ratings',component:RatingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
