import { Routes } from '@angular/router';

import { UserPageComponent } from './Components/user-page/user-page.component';
import { AdminPageComponent } from './Components/admin-page/admin-page.component';
import { HomeComponent } from './Components/home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', component: UserPageComponent },
    { path: 'admin', component: AdminPageComponent },
];
