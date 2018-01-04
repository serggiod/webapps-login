import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }     from './app.component';
import { HeaderComponent }  from './header/header.component';
import { LogoutComponent }  from './logout/logout.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { ApplicationsComponent } from './applications/applications.component';
import { routing, appRoutingProviders } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormLoginComponent,
    ApplicationsComponent,
    LogoutComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }