import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  usuario = {
    id_usuario: '',
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    tipo_usuario: ''
  };

  constructor(private http: HttpClient, public dialogRef?: MatDialogRef<RegistroUsuarioComponent>) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.http.post('http://localhost:3000/usuarios', this.usuario)
        .subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            alert('Usuario registrado correctamente');
            this.dialogRef?.close();  // Cerrar el modal después de un registro exitoso
            form.resetForm();  // Reiniciar el formulario después del envío
          },
          error => {
            console.error('Error al registrar usuario:', error);
            alert('Ocurrió un error al registrar el usuario');
          }
        );
    } else {
      console.log('Formulario inválido');
      alert('Por favor, llena todos los campos');
    }
  }

  onCancel(): void {
    this.dialogRef?.close();  // Cerrar el modal cuando el usuario cancela el registro
  }

  
}
