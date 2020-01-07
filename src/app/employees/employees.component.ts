import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[];
  getEmployeeSub: any;
  loadingError: boolean = false;
  filteredEmployees: Employee[];

  constructor(private empServ: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployeeSub = this.empServ.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
        this.filteredEmployees = employees;
      },
        function (e) { this.loadingError = true; }
      );
  }

  routeEmployee(id: string) {
    this.router.navigate(['/employee/', id]);
  }

  onEmployeeSearchKeyUp(event: any) {
    let substring: string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((emp) =>
      ((emp.FirstName.toLowerCase().indexOf(substring) != -1) ||
        (emp.LastName.toLowerCase().indexOf(substring) != -1) ||
        (emp.Position["PositionName"].toLowerCase().indexOf(substring) != -1)))

  }

  ngOnDestroy() {
    if (this.getEmployeeSub != 'undefined') {
      this.getEmployeeSub.unsubscribe();
    }
  }
}
