import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.component.html',
  styleUrls: ['./registrar-vehiculo.component.css']
})
export class RegistrarVehiculoComponent implements OnInit {
  vehiculos: any[] = [];
  vehiculo = {
    marca: '',
    modelo: '',
    color: '',
    placa: ''
  };
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.http.get<any[]>(`http://localhost:3000/vehicles/${id_usuario}`).subscribe(
        (data:any) => {
          this.vehiculos = data.vehicles;
        },
        error => {
          console.error('Error al obtener los vehículos:', error);
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const id_usuario = localStorage.getItem('id_usuario');
      const vehiculo = { id_usuario, ...form.value };
      this.http.post('http://localhost:3000/add-vehicle', vehiculo)
        .subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            alert('Vehículo registrado correctamente');
            this.vehiculos.push(response);
            form.resetForm();
            this.cargarVehiculos();
            this.errorMessage = null;
          },
          error => {
            console.error('Error al registrar vehículo:', error);
            this.errorMessage = 'Ocurrió un error al registrar el vehículo';
          }
        );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente';
    }
  }
}