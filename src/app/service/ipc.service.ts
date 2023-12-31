import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpcService {
  private ipc: IpcRenderer = {} as IpcRenderer;
  constructor() {
    /*If window.require is available, it means that electron is running, 
      then ipc will be loaded. */
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron IPC was not loaded');
    }
  }

  public on(channel: string, listener: any): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.on(channel, listener);
  }

  public invoke(channel: string, ...args: any[]): Observable<any> {
    if (!this.ipc) {
      return of('IPC not loaded');
    }
    return from(this.ipc.invoke(channel, ...args));
  }

  public once(channel: string, listener: any): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.once(channel, listener);
  }

  public send(channel: string, ...args: any[]): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.send(channel, ...args);
  }

  public removeAllListeners(channel: string): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.removeAllListeners(channel);
  }
}
