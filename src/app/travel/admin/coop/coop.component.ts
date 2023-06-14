import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpcService } from 'src/app/service/ipc.service';
import { CoopResponse } from 'src/app/interfaces/coop.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormModalCoopComponent } from 'src/app/shared/form-modal-coop/form-modal-coop.component';

@Component({
  selector: 'app-coop',
  templateUrl: './coop.component.html',
  styleUrls: [],
})
export class CoopComponent implements OnDestroy {
  coops: any[] = [];
  miFormulario: FormGroup = this.fb.group({
    coop: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    menber_nr: this.fb.control(1, [
      Validators.required,
      Validators.min(0),
      Validators.max(90000),
    ]),
  });
  mensaje: string = '';

  constructor(
    private ipcService: IpcService,
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {}

  agregarCoop() {
    console.log(this.miFormulario.value.coop);
    this.ipcService
      .invoke(
        'registrar-coop',
        this.miFormulario.value.coop,
        this.miFormulario.value.menber_nr
      )
      .subscribe((res: CoopResponse) => {
        if (res.success) {
          this.miFormulario.reset();
          this.mensaje = `La cooperativa ${res.coop.name} ha sido registrada exitosamente.`;
          this.ipcService.invoke('get-coops').subscribe((res: any[]) => {
            this.coops = res;
            console.log(this.coops);
          });
        } else {
          this.mensaje = `Error: ${res.message}`;
        }
      });
  }
  validar() {
    return this.miFormulario.invalid && this.miFormulario.touched;
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
