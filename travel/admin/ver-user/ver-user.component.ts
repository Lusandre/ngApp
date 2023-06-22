import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Coop, CoopsResponse } from 'src/app/interfaces/coop.interface';
import { User, UserResponse } from 'src/app/interfaces/user.interface';
import { IpcService } from 'src/app/service/ipc.service';
import { FormModalUserComponent } from 'src/app/shared/form-modal-user/form-modal-user.component';
declare var window: any;

@Component({
  selector: 'app-ver-user',
  templateUrl: './ver-user.component.html',
  styleUrls: ['./ver-user.component.css'],
})
export class VerUserComponent {
  formModal: any;
  user!: User;
  userEdit!: User;
  coops: Coop[] = [];
  edit: boolean = false;

  updateForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    level: ['', [Validators.required]],
  });
  mensaje: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private ipcService: IpcService,
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {}

  loadUser() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.ipcService.invoke('user-for-id', id)),
        tap(console.log)
      )
      .subscribe((resp: UserResponse) => {
        if (resp.success) {
          this.user = resp.user!;
        } else {
        }
      });
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('editUserModal')
    );
    this.loadUser();
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.ipcService.invoke('coops-for-user', id)),
        tap(console.log)
      )
      .subscribe((resp: CoopsResponse) => {
        this.coops = resp.coops!;
        console.log(this.coops);
      });
  }

  openModal(): void {
    const dialogRef = this.matDialog.open(FormModalUserComponent, {
      width: '400px',
      data: {
        tittle: 'Edit User',
        id: this.user.id,
        name: this.user.name,
        username: this.user.username,
        password: this.user.password,
        level: this.user.level,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.succes) {
          this.loadUser();
          this.mensaje = result.message;
          console.log('prueba' + this.mensaje);
        } else {
          this.mensaje = result.message;
        }
      } else {
      }
    });
  }

  editUser() {
    const { id, name, password, level } = this.userEdit;
    console.log(this.userEdit);
    this.ipcService
      .invoke('update-users', id, name, password, level)
      .subscribe((user: UserResponse) => {
        if (user.success) {
          this.formModal.hide();
        } else {
          console.log(user.message);
        } // código para cerrar el cuadro de diálogo y actualizar la lista de usuarios
      });
  }
}
