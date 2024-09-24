import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { SchoolComponent } from './school/school.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path :"students" , component :StudentComponent
  },
  {
    path:"", component : HomeComponent
  },
  {
    path: "school",component:SchoolComponent
  },
  {
    path:"profile" ,component : ProfileComponent
  }
];
