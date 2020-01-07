import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private posServ: PositionService, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.actRoute.params.subscribe((params) => {
      this.positionSubscription = this.posServ.getPosition(params['_id']).subscribe((pos) => {
        this.position = pos[0];
      });
    });
  }

  onSubmit() {
    this.savePositionSubscription = this.posServ.savePosition(this.position).subscribe(
      () => {
        this.successMessage = true;

        setTimeout(() => {
          this.successMessage = false;
        }, 2500);
      },
      () => {
        this.failMessage = true;

        setTimeout(() => {
          this.failMessage = false;
        }, 2500);
      }
    )
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }

    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }

    if (this.savePositionSubscription) {
      this.savePositionSubscription.unsubscribe();
    }
  }
}
