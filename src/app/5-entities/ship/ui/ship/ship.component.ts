import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  Signal,
} from '@angular/core';
import { Ship, ShipDirection, ShipPosition, ShipStatus } from '../../model';
import { ShipService } from '../../lib';

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

  public readonly id: Signal<string> = computed(() => this.ship().id);
  public readonly size: Signal<number> = computed(() => this.ship().size);
  public readonly direction: Signal<ShipDirection> = computed(
    () => this.ship().direction,
  );
  public readonly startPosition: Signal<ShipPosition> = computed(
    () => this.ship().startPosition,
  );
  public readonly status: Signal<ShipStatus> = computed(
    () => this.ship().status,
  );
  public readonly hitPositions: Signal<ShipPosition[]> = computed(
    () => this.ship().hitPositions,
  );

  public fire(position: ShipPosition): void {
    this._shipService.fire(position);
  }
}
