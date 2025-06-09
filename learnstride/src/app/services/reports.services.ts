import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  constructor(private http: HttpClient) {}

  getUserCount(): Observable<number> {
    return this.http.get<{ totalUsers: number }>('https://localhost:7109/api/Users/count').pipe(map(res => res.totalUsers));
  }

  getCourseCount(): Observable<number> {
    return this.http.get<{ totalCourses: number }>('https://localhost:7109/api/Courses/count').pipe(map(res => res.totalCourses));
  }

  getActiveSubscriptionCount(): Observable<number> {
    return this.http.get<{ totalSubscriptions: number }>('https://localhost:7109/api/Subscription/count').pipe(map(res => res.totalSubscriptions));
  }

  getAllMetrics(): Observable<any> {
    return forkJoin({
      totalUsers: this.getUserCount(),
      totalCourses: this.getCourseCount(),
      totalSubscriptions: this.getActiveSubscriptionCount(),
      
    });
  }
}
