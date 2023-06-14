import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Coop, CoopResponse } from 'src/app/interfaces/coop.interface';
import { User, UsersResponse } from 'src/app/interfaces/user.interface';
import { IpcService } from 'src/app/service/ipc.service';
import { FormModalUserComponent } from 'src/app/shared/form-modal-user/form-modal-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  users: User[] = [];
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
  hayError: boolean = false;
  termino: string = '';
  mostrarSugerencia: boolean = false;
  usersSugeridos: User[] = [];

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
          this.ipcService.invoke('get-users').subscribe((res: any[]) => {
            this.users = res;
            console.log(this.users);
          });
        } else {
          this.mensaje = `Error: ${res.message}`;
        }
      });
  }
  validar() {
    return this.miFormulario.invalid && this.miFormulario.touched;
  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);
    this.ipcService.invoke('buscar-users', this.termino).subscribe({
      next: (resp: UsersResponse) => {
        console.log(resp);
        this.users = resp.users!;
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
    this.ipcService.invoke('buscar-users', this.termino).subscribe({
      next: (resp: UsersResponse) => {
        this.usersSugeridos = resp.users!.splice(0, 5);
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

  getusers(): void {}

  ngOnInit() {
    this.ipcService.invoke('get-users').subscribe((res: UsersResponse) => {
      console.log('first');
      this.users = res.users!;
      console.log(this.users);
    });
  }

  openModal(): void {
    const dialogRef = this.matDialog.open(FormModalUserComponent, {
      width: '400px',
      data: { name: 'Usuario' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.succes) {
          this.ipcService
            .invoke('get-users')
            .subscribe((res: UsersResponse) => {
              this.users = res.users!;
              console.log(this.users);
              this.mensaje = result.message;
            });
        } else {
          this.mensaje = result.message;
        }
      } else {
      }
    });
  }

  ngOnDestroy(): void {
    this.ipcService.removeAllListeners('reply');
  }
}
