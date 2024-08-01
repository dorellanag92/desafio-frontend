import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulacionFormComponent } from './postulacion-form/postulacion-form.component';
import { PostulacionListComponent } from './postulacion-list/postulacion-list.component';
import { PostulacionUpdateComponent } from './postulacion-update/postulacion-update.component';

const routes: Routes = [
  { path: 'postulaciones', component: PostulacionListComponent },
  { path: 'nueva-postulacion', component: PostulacionFormComponent },
  { path: 'editar-postulacion/:codigo', component: PostulacionUpdateComponent },
  { path: '', redirectTo: '/nueva-postulacion', pathMatch: 'full' }, // Redireccionar al formulario por defecto
  { path: '**', redirectTo: '/nueva-postulacion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
