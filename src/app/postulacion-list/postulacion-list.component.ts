import { Component, OnInit } from '@angular/core';
import { PostulacionService } from '../services/postulacion.service';
import { Departamento, Facultad, Postulacion } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postulacion-list',
  templateUrl: './postulacion-list.component.html',
  styleUrls: ['./postulacion-list.component.css']
})

export class PostulacionListComponent implements OnInit {
  //se inicializan atributos para almacenar postulacones, las columnas que se mostrarán en la tabla
  //y un atributo para verificar si está cargando o no las postulaciones
  postulaciones: Postulacion[] = [];
  displayedColumns: string[] = ['codigo', 'rut', 'tituloPostulacion', 'facultad', 'departamento', 'correo', 'fecha', 'acciones'];
  facultades: Facultad[] = [];
  departamentos: Departamento[] = [];
  loading = false;

  //manejo de operaciones de postulaciones y rutas
  constructor(
    private postulacionService: PostulacionService,
    private router: Router,
  ) { }

  //Método llamado al inicializar, donde se cargan todas las postulaciones
  ngOnInit() {
    this.getPostulaciones();
    this.getFacultades();
    this.getDepartamentos();
  }

  getFacultades(){
    this.postulacionService.getFacultades().subscribe(facultades => {
      this.facultades = facultades;
    })
  }

  getDepartamentos(){
    this.postulacionService.getDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
    })
  }

  //Método para obtener las postulaciones y almacenarlas en el array anteriormente inicializado
  getPostulaciones(): void {
    this.loading = true;
    this.postulacionService.getPostulaciones().subscribe(postulaciones => {
      this.postulaciones = postulaciones;
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.error('Error al obtener postulaciones:', error);
    });
  }
  
  //Método para navegar hacia la pagina de modificación de postulación usando el codigo de esta misma 
  updatePostulacion(postulacion: Postulacion): void {
    this.router.navigate(['/editar-postulacion', postulacion.codigo]);
  }

  //Método para eliminar una postulación usando su codigo
  deletePostulacion(codigo: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta postulación?')) {
      this.postulacionService.deletePostulacion(codigo).subscribe(() => {
        this.getPostulaciones();
      }, error => {
        console.error('Error al eliminar la postulación:', error);
      });
    }
  }

  getNombreFacultad(id: number): string{
    const facultad = this.facultades.find(f => f.id === id);
    return facultad ? facultad.facultadNombre : 'Desconocido';
  }

  getNombreDepartamento(id: number): string{
    const departamento = this.departamentos.find(d => d.id === id);
    return departamento ? departamento.departamentoNombre : 'Desconocido';
  }

}