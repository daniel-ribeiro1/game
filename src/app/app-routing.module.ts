import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/index/index.module').then(modules => modules.IndexModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./modules/game/game.module').then(modules => modules.GameModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
