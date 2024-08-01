import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento, Facultad, Postulacion } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {
  //URLs de la API q serán utilizados para realizar las peticiones
  private postulacionUrl = 'http://localhost:8080/api/postulaciones';
  private facultadUrl = 'http://localhost:8080/api/facultades';
  private departamentoUrl = 'http://localhost:8080/api/departamentos';

  //constructor para que el servicio pueda realizar solicitudes HTTP
  constructor(private http: HttpClient) {}

  //Metodos para postulaciones
  getPostulaciones(): Observable<Postulacion[]> {
    return this.http.get<Postulacion[]>(this.postulacionUrl);
  }
  createPostulacion(postulacion: Postulacion): Observable<Postulacion> {
    return this.http.post<Postulacion>(this.postulacionUrl, postulacion);
  }

  getPostulacionById(codigo: number): Observable<Postulacion> {
    return this.http.get<Postulacion>(`${this.postulacionUrl}/${codigo}`);
  }

  updatePostulacion(postulacion: Postulacion): Observable<Postulacion> {
    return this.http.put<Postulacion>(`${this.postulacionUrl}/${postulacion.codigo}`, postulacion);
  }

  deletePostulacion(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.postulacionUrl}/${codigo}`);
  }

  //Metodos para facultades
  getFacultades(): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(this.facultadUrl);
  }

  getFacultadById(id: number): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(`${this.facultadUrl}/${id}`);
  }

  //Metodos para departamentos
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.departamentoUrl);
  }

  getDepartamentoById(id: number): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.departamentoUrl}/${id}`);
  }
  
  getDepartamentosByFacultad(facultadId: number): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.departamentoUrl}/facultad/${facultadId}`);
  }
}
