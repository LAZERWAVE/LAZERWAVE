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
    GoingCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
