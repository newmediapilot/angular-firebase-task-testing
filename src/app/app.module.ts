import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularMaterialModule} from './vendor/angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticatedComponent} from './authenticated/authenticated.component';
import {CompleteComponent} from './complete/complete.component';
import {EditorComponent} from './editor/editor.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {LoginComponent} from './login/login.component';
import {TrashComponent} from './trash/trash.component';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedComponent,
    CompleteComponent,
    EditorComponent,
    IntroductionComponent,
    LoginComponent,
    NotFoundComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
