import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrl: './inicio-usuario.component.css'
})
export class InicioUsuarioComponent {
  usuario = {
    id_usuario: '',
    password: '',
  };

  constructor(private http: HttpClient, public dialogRef?: MatDialogRef<InicioUsuarioComponent>) {}

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
