import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  Signal,
} from '@angular/core';
import { Ship, ShipDirection, ShipStatus } from '../../model';
import { Position } from '@entities/position';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ShipComponent {
  readonly ship = input.required<Ship>();
  protected readonly _shipFired = output<Position>();

  public readonly id: Signal<string> = computed(() => this.ship().id);
  public readonly size: Signal<number> = computed(() => this.ship().size);
  public readonly direction: Signal<ShipDirection> = computed(
    () => this.ship().direction,
  );
  public readonly startPosition: Signal<Position> = computed(
    () => this.ship().startPosition,
  );
  public readonly status: Signal<ShipStatus> = computed(
    () => this.ship().status,
  );
  public readonly hitPositions: Signal<Position[]> = computed(
    () => this.ship().hitPositions,
  );

  public fire(position: Position): void {
    this._shipFired.emit(position);
  }
}
