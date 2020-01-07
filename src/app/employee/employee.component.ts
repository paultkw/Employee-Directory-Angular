import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Position } from '../data/position';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeeService } from '../data/employee.service';
import { PositionService } from '../data/position.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  paramSubscription: any;
  employeeSubscription: any;
  getPositionsSubscription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private empServ: EmployeeService, private posServ: PositionService, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.actRoute.params.subscribe((params) => {
      this.employeeSubscription = this.empServ.getEmployee(params['_id']).subscribe(emp => {
        this.employee = emp[0];
      });

      this.getPositionsSubscription = this.posServ.getPositions().subscribe(pos => {
        this.positions = pos;
      });
    });
  }

  onSubmit() {
    this.saveEmployeeSubscription = this.empServ.saveEmployee(this.employee).subscribe(
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
      });
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }

    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }

    if (this.getPositionsSubscription) {
      this.getPositionsSubscription.unsubscribe();
    }

    if (this.saveEmployeeSubscription) {
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}
