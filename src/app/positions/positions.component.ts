import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {
  positions: Position[];
  getPositionSub: any;
  loadingError: boolean = false;

  constructor(private posServ: PositionService, private router: Router) { }

  ngOnInit() {
    this.getPositionSub = this.posServ.getPositions()
      .subscribe(
        positions => this.positions = positions,
        function (e) { this.loadingError = true; }
      );
  }

  routePosition(id: string) {
    this.router.navigate(['/position/', id]);
  }

  ngOnDestroy() {
    if (this.getPositionSub != 'undefined') {
      this.getPositionSub.unsubscribe();
    }
  }
}
