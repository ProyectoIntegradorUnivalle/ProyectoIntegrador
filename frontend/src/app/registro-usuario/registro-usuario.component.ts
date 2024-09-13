import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    //console.log('Datos del formulario:', this.usuario); // Imprime los datos en la consola

    if (form.valid) {
      this.http.post('http://localhost:3000/usuarios', this.usuario)
        .subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            alert('Usuario registrado correctamente');
            form.resetForm();
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

  regresar() {
    // Lógica para regresar a la página principal
  }
}
