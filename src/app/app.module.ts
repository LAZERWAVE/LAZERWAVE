import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    LeafletModule.forRoot()
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
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
