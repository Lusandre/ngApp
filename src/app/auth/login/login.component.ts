import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IpcService } from '../../service/ipc.service';
import { UserResponse } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  myForm: FormGroup = this.fb.group({
    username: ['TES01', [Validators.required]],
    password: ['Prueba', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ipcRenderer: IpcService
  ) {}

  ngOnInit(): void {}

  login() {
    const { username, password } = this.myForm.value;
    this.router.navigateByUrl('/auth/apps');
    this.ipcRenderer
      .invoke('login', username, password)
      .subscribe((res: boolean) => {
        if (res) {
          console.log(res);
        } else {
          console.log(res);
        }
      });
  }
}
