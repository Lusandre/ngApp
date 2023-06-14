import { Component, OnInit } from '@angular/core';
import { CoopsService } from 'src/app/service/coops.service';

@Component({
  selector: 'app-coop',
  templateUrl: './coop.component.html',
  styleUrls: [],
})
export class CoopComponent {
  coops: any[] = [];

  constructor(private coopsService: CoopsService) {}
}
