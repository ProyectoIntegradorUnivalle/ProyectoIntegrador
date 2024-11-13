import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.component.html',
  styleUrls: ['./registrar-vehiculo.component.css']
})
export class RegistrarVehiculoComponent {
  vehiculos: any[] = [];
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const nuevoVehiculo = { ...form.value };
      this.vehiculos.push(nuevoVehiculo);
      form.resetForm();
      this.errorMessage = null;
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente';
    }
  }
}