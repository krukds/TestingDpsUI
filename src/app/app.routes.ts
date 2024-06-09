import { Routes } from '@angular/router';

import { UserPageComponent } from './Components/user-page/user-page.component';
import { AdminPageComponent } from './Components/admin-page/admin-page.component';
import { HomeComponent } from './Components/home/home.component';
import { AppComponent } from './app.component';
import { TestAdminComponent } from './Components/test-admin/test-admin.component';
import { UserAdminComponent } from './Components/user-admin/user-admin.component';
import { GeneralSettingsComponent } from './Components/general-settings/general-settings.component';
import { StatisticsComponent } from './Components/statistics/statistics.component';
import { TestingSettingsComponent } from './Components/testing-settings/testing-settings.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', component: UserPageComponent },
    {
        path: 'admin', component: AdminPageComponent, children: [
            { path: '', redirectTo: 'test-admin', pathMatch: 'full' },
            { path: 'test-admin', component: TestAdminComponent },
            { path: 'user-admin', component: UserAdminComponent },
            { path: 'general-settings', component: GeneralSettingsComponent },
            { path: 'statistics', component: StatisticsComponent },
            { path: 'testing-settings/:id', component: TestingSettingsComponent },
        ]
    },
];

