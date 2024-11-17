import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrl: './agendar-cita.component.css'
})
export class AgendarCitaComponent implements OnInit{
  vehiculos: any[] = [];
  vehiculo = {
    marca: '',
    modelo: '',
    color: '',
    placa: ''
  };
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
}
