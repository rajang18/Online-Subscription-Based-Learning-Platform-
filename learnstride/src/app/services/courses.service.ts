import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private apiUrl = 'https://localhost:7109/api/Courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
getCoursesByPlatformId(platformId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/platform/${platformId}`);
}


  createCourse(course: any): Observable<any> {
    return this.http.post(this.apiUrl, course);
  }

  updateCourse(id: number, course: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

//   getCoursesByUser(userId: number): Observable<any[]> {
//   return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
// }
}
