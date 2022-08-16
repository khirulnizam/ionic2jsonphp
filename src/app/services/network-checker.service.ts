//#refURL https://javascript.plainenglish.io/build-an-ionic-app-that-works-offline-ec8907bb5b8f
//ionic g service services/network-checker

//# pluins network
//npm install @capacitor/network

import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root',
})
export class NetworkCheckerService {
  onlineIndicator: boolean;//flag of network on/off
  constructor() {}

  openCheckNetwork() {
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed', status);
      this.onlineIndicator = status.connected;
    });
  }

  async logNetworkState() {
    const status = await Network.getStatus();

    console.log('Network status:', status);
    this.onlineIndicator = status.connected;
  }
}
