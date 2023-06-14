import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserResponse } from 'src/app/interfaces/user.interface';
import { IpcService } from 'src/app/service/ipc.service';

@Component({
  selector: 'app-form-modal-user',
  templateUrl: './form-modal-user.component.html',
  styleUrls: ['./form-modal-user.component.css'],
})
export class FormModalUserComponent {
  myForm: FormGroup = this.fb.group({
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
  constructor(
    private fb: FormBuilder,
    private ipcService: IpcService,
    public dialogRef: MatDialogRef<FormModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.username) {
      this.myForm.setValue({
        name: data.name,
        username: data.username,
        password: data.password,
        level: data.level,
      });
    }
  }

  agregarUser() {
    this.ipcService
      .invoke(
        'registrar-user',
        this.myForm.value.name,
        this.myForm.value.username,
        this.myForm.value.level,
        this.myForm.value.password
      )
      .subscribe((res: UserResponse) => {
        if (res.success) {
          this.myForm.reset();
          // this.mensaje = `La cooperativa ${res.coop.name} ha sido registrada exitosamente.`;
          this.onClose(
            `El usuario ${res.user?.name} ha sido registrado exitosamente.`,
            true
          );
          console.log(
            `La usuario ${res.user?.name} ha sido registrado exitosamente.`
          );
        } else {
          // this.mensaje = `Error: ${res.message}`;
          this.onClose(`Error: ${res.message}`, false);
          console.log(`Error: ${res.message}`);
        }
      });
  }

  editUser() {
    this.ipcService
      .invoke(
        'update-users',
        this.data.id,
        this.myForm.value.name,
        this.myForm.value.level,
        this.myForm.value.password
      )
      .subscribe((user: UserResponse) => {
        if (user.success) {
          this.onClose(
            `El usuario ${user.user?.id} ha sido actualizado exitosamente`,
            true
          );
        } else {
          console.log(user.message);
          this.onClose(`Error: ${user.message}`, false);
        } // código para cerrar el cuadro de diálogo y actualizar la lista de usuarios
      });
  }

  validar() {
    return this.myForm.invalid && this.myForm.touched;
  }

  cancel() {
    this.dialogRef.close();
  }

  onClose(message: string, succes: boolean): void {
    const resul = {
      message: message,
      succes: succes,
    };
    this.dialogRef.close(resul);
  }
}
