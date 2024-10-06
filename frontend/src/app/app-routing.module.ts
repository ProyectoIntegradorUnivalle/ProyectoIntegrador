import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioUsuarioComponent } from './inicio-usuario/inicio-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { HomeInicioComponent } from './home-inicio/home-inicio.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
    path: "",
    component: PrincipalComponent
  },
  {
    path: "home-inicio-registro",
    component: HomeInicioComponent
  },
  {
    path: "inicio-usuario",
    component: InicioUsuarioComponent
  },
  {
    path: "registro-usuario",
    component: RegistroUsuarioComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
