import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  
  all: boolean = true;
  cardio: boolean = false;
  crossfit: boolean = false;
  powerlifting: boolean = false;

  showAll(): void {
    this.all = true;    
    this.cardio = false;
    this.crossfit = false;
    this.powerlifting = false;
  }

  showCardio(): void {
    this.all = false;    
    this.cardio = true;
    this.crossfit = false;
    this.powerlifting = false;
  }

  showCrossfit(): void {
    this.all = false;    
    this.cardio = false;
    this.crossfit = true;
    this.powerlifting = false;
  }

  showPowerlifting(): void {
    this.all = false;    
    this.cardio = false;
    this.crossfit = false;
    this.powerlifting = true;
  }
}
