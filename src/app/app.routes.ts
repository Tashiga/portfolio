import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'contact', component: },
  { path: '', component: HomeComponent },
  // { path: '**', redirectTo: '' },
  { path: '**', component: NotFoundComponent, title: '404 – Page non trouvée' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
