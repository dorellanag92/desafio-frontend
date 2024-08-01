import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de que esta línea esté presente
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { PostulacionFormComponent } from './postulacion-form/postulacion-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSortModule } from '@angular/material/sort';
import { PostulacionListComponent } from './postulacion-list/postulacion-list.component';
import { PostulacionUpdateComponent } from './postulacion-update/postulacion-update.component';


@NgModule({
  declarations: [		
    AppComponent,
    PostulacionFormComponent,
    PostulacionListComponent,
    PostulacionUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
