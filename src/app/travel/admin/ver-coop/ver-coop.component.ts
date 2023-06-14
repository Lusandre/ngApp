import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpcService } from '../../../service/ipc.service';
import { switchMap, tap } from 'rxjs';
import { CoopResponse, Coop } from 'src/app/interfaces/coop.interface';
import { User, UsersResponse } from 'src/app/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormModalCoopComponent } from 'src/app/shared/form-modal-coop/form-modal-coop.component';
declare var window: any;

@Component({
  selector: 'app-ver-coop',
  templateUrl: './ver-coop.component.html',
  styleUrls: ['./ver-coop.component.css'],
})
export class VerCoopComponent {
  formModal: any;
  coop: Coop = { name: '', id: 0, menber_nr: 0 };
  coopEdit: Coop = { name: '', id: 0, menber_nr: 0 };
  users: User[] = [];
  updateForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    menber_nr: [
      1,
      [Validators.required, Validators.min(0), Validators.max(90000)],
    ],
  });
  mensaje: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ipcService: IpcService,
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {}

  loadCoop() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.ipcService.invoke('coop-for-id', id)),
        tap(console.log)
      )
      .subscribe((resp: CoopResponse) => {
        if (resp.success) {
          this.coop = resp.coop;
        } else {
        }
      });
  }

  ngOnInit(): void {
    this.loadCoop();
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.ipcService.invoke('users-for-coop', id)),
        tap(console.log)
      )
      .subscribe((resp: UsersResponse) => {
        this.users = resp.users!;
        console.log(this.users);
      });
  }

  openModal(): void {
    const dialogRef = this.matDialog.open(FormModalCoopComponent, {
      width: '400px',
      data: {
        tittle: 'Edit Coop',
        id: this.coop.id,
        name: this.coop.name,
        menber_nr: this.coop.menber_nr,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.succes) {
          this.loadCoop();
          this.mensaje = result.message;
          console.log('prueba' + this.mensaje);
        } else {
          this.mensaje = result.message;
        }
      } else {
      }
    });
  }
  openEditModal() {
    this.coopEdit = { ...this.coop }; // crea una copia del objeto coop para evitar una referencia
    this.updateForm.setValue({
      name: this.coopEdit.name,
      menber_nr: this.coopEdit.menber_nr,
    });
    console.log(this.coopEdit);
    this.formModal.show(); // código para abrir el cuadro de diálogo
  }

  editCoop() {
    console.log('first');
    this.formModal.hide();
  }
}
