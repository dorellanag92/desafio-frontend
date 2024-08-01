export interface Facultad {
    id: number;
    facultadNombre: string;
}

export interface Departamento {
    id: number;
    departamentoNombre: string;
    facultadId: number;
}

export interface Postulacion {
    codigo?: number;
    rut: string;
    tituloPostulacion: string;
    facultad: { id: number };  // Define como objeto con id
    departamento: { id: number };
    correo: string;
    fecha: string;
}