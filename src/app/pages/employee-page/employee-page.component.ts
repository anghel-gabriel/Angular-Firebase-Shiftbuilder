import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
})
export class EmployeePageComponent implements OnInit {
  isLoading = true;
  employeeId: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('employeeId');
    console.log(this.employeeId);
  }
}
