import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularMaterialModule} from './vendor/angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticatedComponent} from './authenticated/authenticated.component';
import {CompleteComponent} from './authenticated/complete/complete.component';
import {EditorComponent} from './authenticated/editor/editor.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreService} from './service/store.service';
import {LocationService} from './service/location.service';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {ActiveComponent} from './authenticated/active/active.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedComponent,
    CompleteComponent,
    EditorComponent,
    IntroductionComponent,
    LoginComponent,
    NotFoundComponent,
    ActiveComponent
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    StoreService,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
