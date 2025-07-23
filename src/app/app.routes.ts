import { Routes } from '@angular/router';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { SignupComponent } from './login/signup/signup.component';
import { LoginComponent } from './login/login/login.component';
import { AuthguardService } from './authguard.service';
import { PaymentComponent } from './payment/payment.component';
import { RegistrationComponent } from './admin/registration/registration.component';

import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component'

export const routes: Routes = [
  { path: '', component: LoginComponent },
   { path: 'payment', component: PaymentComponent },

 
  { path: 'forget', component: ForgetPasswordComponent },


  { path: 'signup', component: SignupComponent },

  {
  path: 'favorites',
  loadComponent: () => import('./favorites/favorites.component').then(m => m.FavoritesComponent)
},


  {
    path: 'dashboard',
    canActivate: [AuthguardService],
    loadComponent: () =>
      import('./dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },

 {
    path: 'search',
    loadComponent: () =>
      import('./search-results/search-results.component').then(
        (m) => m.SearchResultsComponent
      )
  },

  {
  path: 'admin/search',
  loadComponent: () =>
    import('./admin/searchresults/searchresults.component').then(
      (m) => m.SearchResultsComponent
    )
}

,

  {
    path: 'property/:id',
    loadComponent: () =>
      import('./dashboard/dashboard/components/property-details/property-details.component').then(
        (m) => m.PropertyDetailsComponent
      ),
  },

  { path: 'admin', component: AdminComponent },

  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },

  { path: 'register-hotel', component: RegistrationComponent }

 
];

