import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-my-courses',
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard-my-courses.component.html',
  styleUrl: './dashboard-my-courses.component.css'
})
export class DashboardMyCoursesComponent implements OnInit {
  searchTerm = '';
  selectedCategory = '';
  categories: string[] = [];

  courses: any[] = [];

  num1: string = '';



  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserCourses();
  }

  fetchUserCourses(): void {
    
    const user = JSON.parse(localStorage.getItem('user') || '{}'); console.log(user)
    let userId = user.userID; 
    if (!userId) {
      alert('User not logged in!');
      return;
    }

    this.http.get<any[]>(`https://localhost:7109/api/Courses/user/${userId}`).subscribe({
     next: (data) => {

  const validCourses = data.filter(course => course.subscriptionStatus !== 'Cancelled');

  this.courses = validCourses;

  this.categories = [...new Set(validCourses.map(course => course.categoryName || 'Uncategorized'))];
},

      error: () => {
        alert(' Failed to load courses.');
      }
    });
  }

 get filteredCourses(): any[] {
  return this.courses
    .filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCategory ? course.categoryName === this.selectedCategory : true) &&
      course.subscriptionStatus !== 'Cancelled' 
    );
}

}
