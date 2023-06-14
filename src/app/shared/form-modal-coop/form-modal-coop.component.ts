import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoopResponse } from 'src/app/interfaces/coop.interface';
import { IpcService } from 'src/app/service/ipc.service';

@Component({
  selector: 'app-form-modal-coop',
  templateUrl: './form-modal-coop.component.html',
  styleUrls: ['./form-modal-coop.component.css'],
})
export class FormModalCoopComponent {
  myForm: FormGroup = this.fb.group({
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
  constructor(
    private fb: FormBuilder,
    private ipcService: IpcService,
    public dialogRef: MatDialogRef<FormModalCoopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.name) {
      this.myForm.setValue({
        coop: data.name,
        menber_nr: data.menber_nr,
      });
    }
  }

  agregarCoop() {
    this.ipcService
      .invoke(
        'registrar-coop',
        this.myForm.value.coop,
        this.myForm.value.menber_nr
      )
      .subscribe((res: CoopResponse) => {
        if (res.success) {
          this.myForm.reset();
          // this.mensaje = `La cooperativa ${res.coop.name} ha sido registrada exitosamente.`;
          this.onClose(
            `La cooperativa ${res.coop.name} ha sido registrada exitosamente.`,
            true
          );
          console.log(
            `La cooperativa ${res.coop.name} ha sido registrada exitosamente.`
          );
        } else {
          // this.mensaje = `Error: ${res.message}`;
          this.onClose(`Error: ${res.message}`, false);
          console.log(`Error: ${res.message}`);
        }
      });
  }

  editCoop() {
    this.ipcService
      .invoke(
        'update-coop',
        this.data.id,
        this.myForm.value.coop,
        this.myForm.value.menber_nr
      )
      .subscribe((res: CoopResponse) => {
        if (res.success) {
          this.onClose(
            `La coop ${res.coop.id} ha sido actualizada exitosamente`,
            true
          );
        } else {
          console.log(res.message);
          this.onClose(`Error: ${res.message}`, false);
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
