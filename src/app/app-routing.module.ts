import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }      from './home/home.component';
import { GenresComponent }      from './genres/genre.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: []
})

const routes: Routes = [
  { path: 'tracks', component: HomeComponent }
];
export class AppRoutingModule { }
