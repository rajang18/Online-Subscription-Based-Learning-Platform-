import { Component, OnInit } from '@angular/core';
0
import { OverviewService } from '../../services/overview.service';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  totalCourses = 0;
  totalStudents = 0;
  totalrevenue = 0;

  constructor(private overviewService: OverviewService) {}

  ngOnInit(): void {
    this.overviewService.getCourseCount().subscribe(count => {
      console.log('Course Count:', count);
      this.totalCourses = count;
    });

    this.overviewService.getStudentCount().subscribe(count => {
      console.log('Student Count:', count);
      this.totalStudents = count;
    });

    this.overviewService.getTotalRevenue().subscribe(amount => {
      console.log('Total Revenue:', amount);
      this.totalrevenue = amount;
    });
  }
}