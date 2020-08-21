import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',// login
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    // canActivate (Send to introduction if token=true)
  },
  {
    path: 'app',
    // canActivate (login guard here)
    children: [
      {
        path: 'introduction',
        loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule)
        // canActivate (Send to editor if introduction=true)
      },
      {
        path: 'editor',
        loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
      },
      {
        path: 'complete',
        loadChildren: () => import('./complete/complete.module').then(m => m.CompleteModule)
      },
      {
        path: 'trash',
        loadChildren: () => import('./trash/trash.module').then(m => m.TrashModule)
      },
      {
        path: '**', redirectTo: 'introduction'
      }
    ],
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '**', redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
