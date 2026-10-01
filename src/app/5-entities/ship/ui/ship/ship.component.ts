import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  Signal,
} from '@angular/core';
import {
  Ship,
  ShipDirection,
  ShipPosition,
  ShipService,
  ShipStatus,
} from '@entities/ship';

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

  private readonly _shipService = inject(ShipService);

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

  public fire(position: ShipPosition): void {
    this._shipService.fire(position);
  }
}
