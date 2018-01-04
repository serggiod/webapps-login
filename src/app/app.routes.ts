import { ModuleWithProviders   }   from '@angular/core';
import { Routes, RouterModule  }   from '@angular/router';
import { FormLoginComponent    }   from './form-login/form-login.component';
import { ApplicationsComponent }   from './applications/applications.component';
import { LogoutComponent       }   from './logout/logout.component';

const appRoutes:Routes = [
    { path: ''            , redirectTo: 'login', pathMatch: 'full' },
    { path: 'login'       , component: FormLoginComponent          },
    { path: 'applications', component: ApplicationsComponent       },
    { path: 'logout'      , component: LogoutComponent             },
    { path: '**'          , redirectTo: 'login', pathMatch: 'full' }
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);