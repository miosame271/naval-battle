import { NgClass } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Field } from '@entities/model';

@Component({
  selector: 'app-area',
  imports: [NgClass],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
  standalone: true
})
export class AreaComponent implements OnInit {
  @Input() editable = true;

  fields: Field[] = [];
  loading = signal(true);

  ngOnInit(): void {
    this.createNewArea();
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
            ceil: j
          },
          hasShip: false,
          isHit: false
        })
      }
    }
    this.loading.set(false);
  }

  private fire(index: number): void {
    const field = this.fields[index];

    if (!field.isHit) {
      field.isHit = true;
      this.fields[index] = field;
    }
  }
}
