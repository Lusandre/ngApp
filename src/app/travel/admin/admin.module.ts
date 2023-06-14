import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { VerUserComponent } from './ver-user/ver-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    VerUserComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
