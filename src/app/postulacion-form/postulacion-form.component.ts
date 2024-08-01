import { Component, OnInit } from '@angular/core';
import { PostulacionService } from '../services/postulacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Postulacion } from '../models/models';

@Component({
  selector: 'app-postulacion-form',
  templateUrl: './postulacion-form.component.html',
  styleUrl: './postulacion-form.component.css'
})
export class PostulacionFormComponent implements OnInit {
  //se inicializa instancia de FormGroup para representar el formulario
  formulario: FormGroup;
  //arrays para el almacenamiento de facultades y departamentos
  facultades: any[] = [];
  departamentos: any[] = [];
  //boolean paramanejar el estado de carga del formulario
  loading = false;


  constructor(
    //Manejo de formulario y las operaciones para postulaciones
    private fb: FormBuilder,
    private postulacionService: PostulacionService
  ) {
    //Estructura y validación del formulario
    this.formulario = this.fb.group({
      rut: ['', Validators.required],
      titulo: ['', Validators.required],
      facultad: ["", Validators.required],
      departamento: ["", Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha: [new Date(), Validators.required]
    });
  }

  //Método llamado al inicializar, obteniendo todas las facultades
  ngOnInit(): void {
    this.getFacultades();
  }
  //Método para obtener las facultades
  getFacultades(): void {
    this.postulacionService.getFacultades().subscribe(facultades => {
      this.facultades = facultades;
    }, error => {
      console.error('Error al obtener departamentos:', error);
    });
  }

  //Metodo para obtener los departamentos de acuerdo a la id de la facultad seleccionada
  getDepartamentos(facultadId: number): void {
    this.postulacionService.getDepartamentosByFacultad(facultadId).subscribe(departamentos => {
      this.departamentos = departamentos;
    }, error => {
      console.error('Error al obtener departamentos:', error);
    });
  }

  //Método que carga los departamentos cuando se seleccoina la facultad
  onFacultadChange(facultadId: number): void {
    this.getDepartamentos(facultadId);
  }

  //Método para guardar una postulacion
  //Verifica si el formulario es válido, construye un objeto para postulación
  //crea la postulacion llamando al servicio correspondiente
  saveChanges(): void {
    if (this.formulario.valid) {
      this.loading = true;
      const postulacion = this.formulario.value;
      const postulacionData: Postulacion = {
        rut: postulacion.rut,
        tituloPostulacion: postulacion.titulo,
        facultad: { id: postulacion.facultad },
        departamento: { id: postulacion.departamento },
        correo: postulacion.correo,
        fecha: new Date().toISOString().split('T')[0]
      };
      this.postulacionService.createPostulacion(postulacionData).subscribe(() => {
        this.loading = false;
        alert('Postulación enviada con éxito');
      }, error => {
        this.loading = false;
        alert('Error al enviar la postulación');
      });
    }
  }
}