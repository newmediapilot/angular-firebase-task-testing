import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {EditorComponent} from './editor/editor.component';
import {CompleteComponent} from './complete/complete.component';
import {TrashComponent} from './trash/trash.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthenticatedComponent} from './authenticated/authenticated.component';

const routes: Routes = [
  {
    path: '',// login
    component: LoginComponent
    // canActivate (Send to introduction if token=true)
  },
  {
    path: 'authenticated', // canActivate (login guard here)
    component: AuthenticatedComponent,
    children: [
      {
        path: 'introduction',
        component: IntroductionComponent
        // canActivate (Send to editor if introduction=true)
      },
      {
        path: 'editor',
        component: EditorComponent
      },
      {
        path: 'complete',
        component: CompleteComponent
      },
      {
        path: 'trash',
        component: TrashComponent
      },
      {
        path: 'app/**', redirectTo: 'introduction'
      }
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**', redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
