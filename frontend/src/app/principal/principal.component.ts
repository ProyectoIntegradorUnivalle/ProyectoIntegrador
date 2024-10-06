import { Component } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  sliderImages = [
    "/assets/images/carro1.jpg",
    "/assets/images/carro2.jpg",
    "/assets/images/carro3.jpg"
  ]

  sliderTexts = [
    "LAVADO Y DETALLADO DE AUTOS Y MUEBLES",
    "EQUIPO CON EXPERIENCIA PROFESIONAL",
    "MEJORES ACABADOS, MEJORES PRODUCTOS"
  ];

}


