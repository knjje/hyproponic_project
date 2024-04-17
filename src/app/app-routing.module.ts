import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './function/login/login.component';
import { RegisterComponent } from './function/register/register.component';
import { HomeComponent } from './function/home/home.component';
import { OutletComponent } from './outlet/outlet/outlet.component';
import { LoginOutletComponent } from './outlet/login-outlet/login-outlet.component';
import { QuantityComponent } from './function/quantity/quantity.component';
import { RelayComponent } from './function/relay/relay.component';
import { SprinkerComponent } from './function/sprinker/sprinker.component';
import { MainComponent } from './outlet/main/main.component';
import { SideNavComponent } from './outlet/side-nav/side-nav.component';
import { SettingTimeComponent } from './function/setting-time/setting-time.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // {
  //   path: '',
  //   component: LoginOutletComponent,
  //   children: [
  //     { path: 'login', component: LoginComponent },
  //     { path: 'register', component: RegisterComponent },
  //   ],
  // },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'quantity', component: QuantityComponent },
      { path: 'relay', component: RelayComponent },
      { path: 'sprinker', component: SprinkerComponent },
      { path: 'set-time', component: SettingTimeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
