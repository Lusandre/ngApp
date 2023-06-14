import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { IpcService } from '../../service/ipc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  pong: boolean = false;
  coops: any[] = [];

  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef
  ) {}

  ping = (): void => {
    console.log('hi');
    this.ipcService.send('message', 'ping');
    this.ipcService.on('reply', (event: any, arg: string) => {
      this.pong = arg === 'pong';
      this.cdRef.detectChanges();
    });
  };

  getCoops(): void {
    this.ipcService.invoke('get-coops').subscribe(
      (res: any[]) => {
        this.coops = res;
        console.log(this.coops);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ipcService.removeAllListeners('reply');
  }
}
