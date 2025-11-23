import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Orientations, Ship } from '@entities/model';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  imports: [NgClass],
  standalone: true
})
export class ShipComponent {
  @Input() ship!: Ship;

  Orientations = Orientations;
}
