import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ParcoursComponent } from './pages/parcours/parcours.component';
import { ProjetsComponent } from './pages/projets/projets.component';
import { CompetencesComponent } from './pages/competences/competences.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'parcours', component: ParcoursComponent },
  { path: 'projets', component: ProjetsComponent },
  { path: 'competences', component: CompetencesComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
