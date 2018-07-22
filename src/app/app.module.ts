import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
/*import { AppRoutingModule } from './app-routing.module';*/
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { TracksComponent } from './tracks/tracks.component';
import { GenresComponent } from './genres/genres.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeService } from './home/home.components';
// import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: '', redirectTo: '/home' , pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TracksComponent,
    GenresComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    /*AppRoutingModule,*/
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
