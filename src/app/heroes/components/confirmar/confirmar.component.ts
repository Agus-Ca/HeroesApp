import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [`
  h1, h3 {
    text-align: center;
  }
  `]
})
export class ConfirmarComponent {

  constructor( private dialogRef:MatDialogRef<ConfirmarComponent>,
               @Inject(MAT_DIALOG_DATA) public data:Heroe ) { }

  borrar():void {
    this.dialogRef.close(true);
  }

  cerrar():void {
    this.dialogRef.close();
  }
}