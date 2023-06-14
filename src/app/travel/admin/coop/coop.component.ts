import { Component, OnDestroy } from '@angular/core';
import { IpcService } from 'src/app/service/ipc.service';
import {
  Coop,
  CoopResponse,
  CoopsResponse,
} from 'src/app/interfaces/coop.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormModalCoopComponent } from 'src/app/shared/form-modal-coop/form-modal-coop.component';

@Component({
  selector: 'app-coop',
  templateUrl: './coop.component.html',
  styleUrls: [],
})
export class CoopComponent implements OnDestroy {
  coops: Coop[] = [];
  coopsSugeridos: Coop[] = [];
  mensaje: string = '';
  hayError: boolean = false;
  termino: string = '';
  mostrarSugerencia: boolean = false;

  constructor(private ipcService: IpcService, private matDialog: MatDialog) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);
    this.ipcService.invoke('buscar-coops', this.termino).subscribe({
      next: (resp: any[]) => {
        console.log(resp);
        this.coops = resp;
      },
      error: (err) => {
        this.hayError = true;
        console.log('error');
        console.info(err);
      },
    });
  }

  sugerencias(termino: string) {
    console.log(termino);
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencia = true;
    if (termino === '') this.mostrarSugerencia = false;
    this.ipcService.invoke('buscar-coops', this.termino).subscribe({
      next: (coops: any[]) => {
        this.coopsSugeridos = coops.splice(0, 5);
      },
      error: (err) => {
        this.hayError = true;
        console.log('error');
        console.info(err);
      },
    });
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }

  openModal(): void {
    const dialogRef = this.matDialog.open(FormModalCoopComponent, {
      width: '400px',
      data: { tittle: 'Usuario' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.succes) {
          this.ipcService.invoke('get-coops').subscribe((res: any[]) => {
            this.coops = res;
            console.log(this.coops);
            this.mensaje = result.message;
          });
        } else {
          this.mensaje = result.message;
        }
      } else {
      }
    });
  }

  getCoops(): void {}

  ngOnInit(): void {
    this.ipcService.invoke('get-coops').subscribe((res: any[]) => {
      this.coops = res;
      console.log(this.coops);
    });
  }

  ngOnDestroy(): void {
    this.ipcService.removeAllListeners('reply');
  }
}
