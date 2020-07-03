import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { DefaultComponent } from './componentes/default/default.component';
import { ErrorComponent } from './componentes/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
