import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import { InicioUsuarioComponent } from '../inicio-usuario/inicio-usuario.component';

@Component({
  selector: 'app-home-inicio',
  templateUrl: './home-inicio.component.html',
  styleUrl: './home-inicio.component.css'
})
export class HomeInicioComponent {

  constructor(public dialog: MatDialog) {}

  // Método para abrir el modal
  registrarUsuario(): void {
    const dialogRef = this.dialog.open(RegistroUsuarioComponent, {
      width: '600px',  // Puedes ajustar el tamaño de la ventana modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

  iniciarUsuario(): void {
    const dialogRef = this.dialog.open(InicioUsuarioComponent, {
      width: '600px',  // Puedes ajustar el tamaño de la ventana modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

}
