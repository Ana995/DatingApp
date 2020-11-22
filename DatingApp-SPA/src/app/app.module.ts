import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import{JwtModule} from '@auth0/angular-jwt';
import {AuthGuard} from './_guards/auth.guard';
import{UserService} from './_services/user.service';
import {MemberDetailResolver} from './_resolver/member-detail.resolver';
import {AuthService} from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider  } from './_services/error.interceptor';
import {AlertifyService } from './_services/alertify.service';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import {appRoutes} from './routes';
import {MemberCardComponent} from './members/member-card/member-card.component';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MemberEditComponent} from './members/member-edit/member-edit.component';
import {MemberListResolver} from './_resolver/member-list.resolver';
import {MemberEditResolver} from './_resolver/member-edit.resolver';


import { NgxGalleryModule } from '@kolkov/ngx-gallery';
export function  tokenGetter(){
  return localStorage.getItem('token');
}
 @NgModule({
  declarations: [
    AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MessagesComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains :['localhost:5002'],
        disallowedRoutes:['localhost:5002/api/auth']
      }

    })
  ],
  providers: [
    ErrorInterceptorProvider,
    AuthService, 
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
