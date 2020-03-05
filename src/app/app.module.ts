import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/Login/login/login.component'
// import { MatDialogModule } from '@angular/material';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './Components/register/register.component';
import { GoingPlaneComponent } from './Components/home-page/goingAnyWhereComponent/going-plane/going-plane.component';
import { GoingHotelComponent } from './Components/home-page/goingAnyWhereComponent/going-hotel/going-hotel.component';
import { GoingCarComponent } from './Components/home-page/goingAnyWhereComponent/going-car/going-car.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { EventPageComponent } from './Components/event-page/event-page.component';
import { EventDetailPageComponent } from './Components/event-page/event-detail/event-detail-page/event-detail-page.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EventOrderPageComponent } from './Components/event-page/event-order/event-order-page/event-order-page.component';
import { EventOrderDetailComponent } from './Components/event-page/event-order/event-order-detail/event-order-detail.component';
import { EventSearchComponent } from './Components/event-page/event-search/event-search.component';
import { RentPageComponent } from './Components/rent-page/rent-page.component';
import { RentDetailComponent } from './Components/rent-page/rent-detail/rent-detail.component';
import { TrainPageComponent } from './Components/train-page/train-page.component';
import { ChattingComponent } from './Components/chatting/chatting.component';
import { CheckoutPageComponent } from './Components/checkout-page/checkout-page.component';
import { TrainDetailComponent } from './Components/train-page/train-detail/train-detail.component';
import { GoogleComponent } from './Components/google/google.component';
import { FacebookComponent } from './Components/facebook/facebook.component';
import { ManageEventComponent } from './Components/Admin-Manage/manage-event/manage-event.component';
import { Login2Component } from './Components/Login/login2/login2.component';
import { Login3Component } from './Components/Login/login3/login3.component';
import { ManageTrainComponent } from './Components/Admin-Manage/manage-train/manage-train.component';
import { BlogComponent } from './Components/blog/blog.component';
import { ManageBlogComponent } from './Components/Admin-Manage/manage-blog/manage-blog.component';
import { BlogDetailComponent } from './Components/blog/blog-detail/blog-detail.component';
import { ShareButtonModule } from '@ngx-share/button';
import { AccountComponent } from './Components/account/account.component';
import { PromoComponent } from './Components/promo/promo.component';
import { FlightComponent } from './Components/flight/flight.component';
import { ManageFlightComponent } from './Components/Admin-Manage/manage-flight/manage-flight.component';
import { HotelComponent } from './Components/hotel/hotel.component';
import { HotelMapComponent } from './Components/hotel/hotel-map/hotel-map.component';
import { HotelDetailComponent } from './Components/hotel-detail/hotel-detail.component';
import { MapPopUpService } from './backended/map/map-pop-up/map-pop-up.service';
import { ManageHotelComponent } from './Components/Admin-Manage/manage-hotel/manage-hotel.component';
import { MatSelectModule } from '@angular/material';
import { FlightDetailComponent } from './Components/flight/flight-detail/flight-detail.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalenderComponent } from './Components/calender/calender.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    GoingPlaneComponent,
    LoginComponent,
    RegisterComponent,
    GoingPlaneComponent,
    GoingHotelComponent,
    GoingCarComponent,
    EventPageComponent,
    EventDetailPageComponent,
    EventOrderPageComponent,
    EventOrderDetailComponent,
    EventSearchComponent,
    RentPageComponent,
    RentDetailComponent,
    TrainPageComponent,
    ChattingComponent,
    CheckoutPageComponent,
    TrainDetailComponent,
    GoogleComponent,
    FacebookComponent,
    ManageEventComponent,
    Login2Component,
    Login3Component,
    ManageTrainComponent,
    BlogComponent,
    ManageBlogComponent,
    BlogDetailComponent,
    AccountComponent,
    PromoComponent,
    FlightComponent,
    ManageFlightComponent,
    HotelComponent,
    HotelMapComponent,
    HotelDetailComponent,
    ManageHotelComponent,
    FlightDetailComponent,
    CalenderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    ShareButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    EventOrderDetailComponent,
    TrainDetailComponent,
    Login2Component,
    Login3Component,
  
  ],
  providers: [
    MapPopUpService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
