import {
  Component,
  computed,
  input,
  Input,
  linkedSignal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  Ship,
  ShipDirection,
  ShipPosition,
  ShipStatus,
} from '@entities/ship/model/ship.interface';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
})
export class ShipComponent {
  readonly ship = input.required<Ship>();

  private readonly _ship = linkedSignal<Ship>(this.ship);

  public readonly id: Signal<string> = computed(() => this._ship().id);
  public readonly size: Signal<number> = computed(() => this._ship().size);
  public readonly direction: Signal<ShipDirection> = computed(
    () => this._ship().direction,
  );
  public readonly startPosition: Signal<ShipPosition> = computed(
    () => this._ship().startPosition,
  );
  public readonly status: Signal<ShipStatus> = computed(
    () => this._ship().status,
  );
  public readonly hitPositions: Signal<ShipPosition[]> = computed(
    () => this._ship().hitPositions,
  );

  constructor() {}

  public rotate(): void {
    const currentShip = this._ship();
    currentShip.direction =
      currentShip.direction === ShipDirection.Horizontal
        ? ShipDirection.Vertical
        : ShipDirection.Horizontal;
    this._ship.set(currentShip);
  }

  public hit(position: ShipPosition): void {
    const currentShip = this._ship();
    if (!this._isPositionHit(position)) {
      currentShip.hitPositions.push(position);
    }
    this._updateStatus();
  }

  private _isPositionHit(position: ShipPosition): boolean {
    return this.hitPositions().some(
      (hitPosition) =>
        hitPosition.row === position.row &&
        hitPosition.column === position.column,
    );
  }

  private _updateStatus(): void {
    const currentShip = this._ship();
    if (currentShip.hitPositions.length === 0) {
      currentShip.status = ShipStatus.Intact;
    } else if (
      currentShip.hitPositions.length > 0 &&
      currentShip.hitPositions.length < currentShip.size
    ) {
      currentShip.status = ShipStatus.Damaged;
    } else if (currentShip.hitPositions.length === currentShip.size) {
      currentShip.status = ShipStatus.Destroyed;
    }
    this._ship.set(currentShip);
  }
}
