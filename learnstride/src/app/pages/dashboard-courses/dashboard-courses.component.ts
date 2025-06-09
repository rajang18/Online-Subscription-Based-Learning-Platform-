import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-dashboard-courses',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard-courses.component.html',
  styleUrl: './dashboard-courses.component.css'
})
export class DashboardCoursesComponent implements OnInit {
   courses: any[] = [];
  filteredCourses: any[] = [];
  categories: any[] = [];

  searchText: string = '';
  selectedCategory: string = '';

  constructor(private courseService: CoursesService, private categoryService: CategoryService,private router:Router) {}

  ngOnInit(): void {
     this.courseService.getCourses().subscribe(data => {
    this.courses = data;
    this.filteredCourses = data; 
  });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = [...data];
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
    console.log(data)
      this.categories = data;
    });
  }

 filterCourses(): void {
  this.filteredCourses = this.courses.filter(course => {
    const matchesCategory =
      !this.selectedCategory || course.categoryID == this.selectedCategory;
    const matchesSearch =
      !this.searchText ||
      course.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      course.description.toLowerCase().includes(this.searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}

  goToCart() {
  this.router.navigate(['dashboard/cart']);
}
}