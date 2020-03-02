import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailPageComponent } from './Components/event-page/event-detail/event-detail-page/event-detail-page.component'
import { HomePageComponent } from './Components/home-page/home-page.component'
import { EventPageComponent } from './Components/event-page/event-page.component'
import { EventOrderPageComponent } from './Components/event-page/event-order/event-order-page/event-order-page.component'
import { EventSearchComponent } from './Components/event-page/event-search/event-search.component'
import { RentPageComponent } from './Components/rent-page/rent-page.component'
import { TrainPageComponent } from './Components/train-page/train-page.component'
import { CheckoutPageComponent } from './Components/checkout-page/checkout-page.component';
import { ManageEventComponent } from './Components/Admin-Manage/manage-event/manage-event.component';
import { ManageTrainComponent } from './Components/Admin-Manage/manage-train/manage-train.component';
import { BlogComponent } from './Components/blog/blog.component';
import { ManageBlogComponent } from './Components/Admin-Manage/manage-blog/manage-blog.component'
import { BlogDetailComponent } from './Components/blog/blog-detail/blog-detail.component';
import { AccountComponent } from './Components/account/account.component'
import { PromoComponent } from './Components/promo/promo.component';
import { FlightComponent } from './Components/flight/flight.component'
import { ManageFlightComponent } from './Components/Admin-Manage/manage-flight/manage-flight.component';

const routes: Routes = [
  {path:'EventDetail',component: EventDetailPageComponent},
  {path:'Home',component:HomePageComponent},
  {path:'Event',component:EventPageComponent},
  {path:'EventOrder',component:EventOrderPageComponent},
  {path:'EventSearch',component:EventSearchComponent},
  {path:'CarRent',component:RentPageComponent},
  {path:'Train',component:TrainPageComponent},
  {path:'Checkout',component:CheckoutPageComponent},
  {path:'ManageEvent',component:ManageEventComponent},
  {path:'ManageTrain',component:ManageTrainComponent},
  {path:'Blog',component:BlogComponent},
  {path:'ManageBlog',component:ManageBlogComponent},
  {path:'BlogDetail',component:BlogDetailComponent},
  {path:'Account',component:AccountComponent},
  {path:'Promo',component:PromoComponent},
  {path:'Flight',component:FlightComponent},
  {path:'ManageFlight',component:ManageFlightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
