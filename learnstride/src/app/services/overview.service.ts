import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OverviewService {
  constructor(private http: HttpClient) {}

  getCourseCount(): Observable<number> {
    return this.http.get<{ totalCourses: number }>('https://localhost:7109/api/Courses/count')
      .pipe(map(response => response.totalCourses));
  }

  getStudentCount(): Observable<number> {
    return this.http.get<{ totalUsers: number }>('https://localhost:7109/api/Users/count')
      .pipe(map(response => {return response.totalUsers}));
  }

  getTotalRevenue(): Observable<number> {
    return this.http.get<{ totalSubscriptions: number }>('https://localhost:7109/api/Subscription/count')
      .pipe(map(response =>{ return response.totalSubscriptions}));
  }
}
