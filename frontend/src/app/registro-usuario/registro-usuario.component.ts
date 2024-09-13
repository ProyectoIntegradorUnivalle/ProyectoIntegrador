// src/app/registro-usuario/registro-usuario.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  // Propiedad usuario con los campos del formulario
  usuario = {
    nombre: '',
    correo: '',
    password: '',
    tipoUsuario: '' // Eliminamos el campo placa porque ya no está en el formulario
  };

  // Inyección del Router en el constructor
  constructor(private router: Router) {}

  // Maneja el envío del formulario
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Formulario Enviado:', this.usuario);
      alert('Usuario registrado con éxito');
      // Aquí puedes agregar lógica adicional si lo deseas
    } else {
      console.log('Formulario inválido');
      alert('Formulario inválido');
    }
  }

  // Método para regresar a la página principal
  regresar() {
    this.router.navigate(['/']); // Navega a la ruta raíz o la página principal
  }
}
