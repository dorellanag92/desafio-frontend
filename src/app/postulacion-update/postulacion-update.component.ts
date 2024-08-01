import { Component, OnInit } from '@angular/core';
import { Departamento, Facultad, Postulacion } from '../models/models';
import { PostulacionService } from '../services/postulacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-postulacion-update',
  templateUrl: './postulacion-update.component.html',
  styleUrls: ['./postulacion-update.component.css']
})
export class PostulacionUpdateComponent implements OnInit {
  //Se inicializa el objeto postulacion que se editará
  //también los arrays que almacenarán las facultades y departamentos
  postulacion: Postulacion = {
    codigo: 0,
    rut: '',
    tituloPostulacion: '',
    facultad: { id: 0, },
    departamento: { id: 0,},
    correo: '',
    fecha: ''
  };
  facultades: Facultad[] = [];
  departamentos: Departamento[] = [];
  loading = false;
  error: string | null = null;

  //manejo de operaciones de postulaciones y rutas
  constructor(
    private postulacionService: PostulacionService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  //Método llamado al inicializar el componente en el cual se obtiene el codigo de la postulación
  //con sus respectivos datos al igual que las facultades
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const codigo = +params.get('codigo')!;
      this.loadPostulacion(codigo);
    });
    this.getFacultades();
  }
  
  //metodo para obtener una postulacion especifica de acuerdo a su codigo
  //cargando el departamento asociado a la facultad seleccionada
  loadPostulacion(codigo: number): void {
    this.loading = true;
    this.postulacionService.getPostulacionById(codigo).subscribe(
      (postulacion) => {
        this.postulacion = postulacion;
        this.loading = false;
        this.loadDepartamentos(this.postulacion.facultad.id);
      },
      (error) => {
        this.loading = false;
        console.error('Error al obtener la postulación:', error);
      }
    );
  }

  //Metodo para cargar las facultades
  getFacultades(): void {
    this.postulacionService.getFacultades().subscribe(facultades => {
      this.facultades = facultades;
    }, error => {
      console.error('Error al obtener facultades:', error);
    });
  }
  //Método que carga los departamentos cuando se selecciona una facultad
    onFacultadChange(facultadId: number): void {
      this.loadDepartamentos(facultadId);
    }

  //Metodo para cargar los departamentos a partir de la facultad
  //almacenandolos en el array anteriormente inicializado
  loadDepartamentos(facultadId: number): void {
    this.postulacionService.getDepartamentosByFacultad(facultadId).subscribe(departamentos => {
      this.departamentos = departamentos;
    }, error => {
      console.error('Error al obtener departamentos:', error);
    });
  }

  //Método que envía la postulación actualizada
  saveChanges(): void {
    this.loading = true;
    this.postulacionService.updatePostulacion(this.postulacion).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['/postulaciones']);
      },
      (error) => {
        this.loading = false;
        this.error = 'Error al actualizar la postulación.';
        console.error('Error al actualizar la postulación:', error);
      }
    );
  }
}