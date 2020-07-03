import { LoginComponent } from './componentes/login/login.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './componentes/register/register.component';
import { DefaultComponent } from './componentes/default/default.component';
import { ErrorComponent } from './componentes/error/error.component';



const routes: Routes = [
  {
    path: 'surala/login', component: LoginComponent
  },
  {
    path: 'surala/register', component: RegisterComponent
  },
  {
    path: 'surala/home', component: DefaultComponent
  },
  {
    path: 'surala/error', component: ErrorComponent
  },
  {
    path: 'surala/logout/:sure', component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'surala/error',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
