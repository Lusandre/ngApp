import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-app-selection-screen',
  templateUrl: './app-selection-screen.component.html',
  styleUrls: ['./app-selection-screen.component.css'],
})
export class AppSelectionScreenComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  apps: any[] = [
    {
      name: 'Admin Controls',
      img: this.images[0],
      desc: 'Access and manage all administrative functions.',
      button: 'Go to Admin Controls',
      link: 'travel',
    },
    {
      name: 'Travel App',
      img: this.images[1],
      desc: 'Register and track your business trips.',
      button: 'Go to Travel App',
      link: 'travel',
    },
    {
      name: 'More Features Coming Soon',
      img: this.images[1],
      desc: 'Stay tuned for new and exciting features.',
    },
  ];
  constructor(private _config: NgbCarouselConfig) {
    _config.interval = 3000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;
  }
}
