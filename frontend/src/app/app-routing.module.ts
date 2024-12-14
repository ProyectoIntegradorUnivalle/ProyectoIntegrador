import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioUsuarioComponent } from './inicio-usuario/inicio-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { HomeInicioComponent } from './home-inicio/home-inicio.component';
import { PrincipalComponent } from './principal/principal.component';
import { SistemaComponent } from './sistema/sistema.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';
import { AuthGuard } from './auth/auth.guard';

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
  },
  {
    path: "sistema",
    component: SistemaComponent,
    canActivate: [AuthGuard], // Aplicar el guard de autenticación a la ruta 'sistema'
    children: [
      {
        path: "perfil-usuario",
        component: PerfilUsuarioComponent,
        canActivate: [AuthGuard] // Aplicar el guard de autenticación a la ruta 'perfil-usuario'
      },
      {
        path: "registrar-vehiculo",
        component: RegistrarVehiculoComponent,
        canActivate: [AuthGuard] // Aplicar el guard de autenticación a la ruta 'registrar-vehiculo'
      },
      {
        path: "agendar-cita",
        component: AgendarCitaComponent,
        canActivate: [AuthGuard] // Aplicar el guard de autenticación a la ruta 'agendar-cita'
      }
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
