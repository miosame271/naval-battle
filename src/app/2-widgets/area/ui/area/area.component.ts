import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Field, Orientations, Ship, Sizes } from '@entities/model';

@Component({
  selector: 'app-area',
  imports: [NgClass, NgStyle],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
  standalone: true,
})
export class AreaComponent implements OnInit {
  @Input() editable = true;

  fields: Field[] = [];
  ships: Ship[] = [];
  loading = signal(true);

  Orientations = Orientations;

  ngOnInit(): void {
    this.createNewArea();
    this.createNewShips();

    this.loading.set(false);
  }

  processClick(index: number): void {
    if (!this.editable) {
      this.fire(index);
    }
  }

  private createNewArea(): void {
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        this.fields.push({
          position: {
            row: i,
            ceil: j,
          },
          hasShip: false,
          isHit: false,
        });
      }
    }
  }

  private createNewShips(): void {
    this.ships.push({
      start: {
        row: 2,
        ceil: 2,
      },
      orientation: Orientations.Vertical,
      size: Number(Sizes.Large),
      hit: [],
    });
    for (let i = 1; i <= 2; i++) {
      this.ships.push({
        start: {
          row: 2,
          ceil: 2 + i * 2,
        },
        orientation: Orientations.Vertical,
        size: Number(Sizes.Medium),
        hit: [],
      });
    }
    for (let i = 1; i <= 3; i++) {
      this.ships.push({
        start: {
          row: 7,
          ceil: 0 + i * 2,
        },
        orientation: Orientations.Vertical,
        size: Number(Sizes.Small),
        hit: [],
      });
    }

    for (let i = 1; i <= 4; i++) {
      this.ships.push({
        start: {
          row: 0 + i * 2,
          ceil: 8,
        },
        orientation: Orientations.Vertical,
        size: Number(Sizes.XSmall),
        hit: [],
      });
    }
  }

  private fire(index: number): void {
    const field = this.fields[index];

    if (!field.isHit) {
      field.isHit = true;
      this.fields[index] = field;
    }
  }
}
