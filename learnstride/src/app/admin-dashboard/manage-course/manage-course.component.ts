import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-course',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-course.component.html',
  styleUrl: './manage-course.component.css'
})
export class ManageCoursesComponent implements OnInit {

  courses: any[] = [];
  categories: any[] = [];

  newCourse = {
    title: '',
    description: '',
    categoryID: '',
    price: 0,
    duration: 0,
    instructor: '',
    rating: 0
  };

  selectedCourse: any = null;

  constructor(
    private courseService: CoursesService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => this.courses = data);
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }

  createCourse(): void {
    const course = {
      ...this.newCourse,
      students: 0,
      date: new Date(),
      status: 'Draft'
    };

    this.courseService.createCourse(course).subscribe(() => {
      this.loadCourses();
      this.resetFormAndCloseModal();
    });
  }

  openEditModal(course: any): void {
    this.selectedCourse = { ...course }; 
    const modal = new bootstrap.Modal(document.getElementById('editCourseModal'));
    modal.show();
  }

  updateCourse(): void {
    this.courseService.updateCourse(this.selectedCourse.courseID, this.selectedCourse)
      .subscribe(() => {
        this.loadCourses();
        const modal = bootstrap.Modal.getInstance(document.getElementById('editCourseModal'));
        modal.hide();
      });
  }

  deleteCourse(course: any): void {
    if (!confirm(`Delete "${course.title}"?`)) return;

    this.courseService.deleteCourse(course.courseID).subscribe(() => {
      this.loadCourses();
    });
  }

  resetFormAndCloseModal(): void {
    this.newCourse = {
      title: '',
      description: '',
      categoryID: '',
      price: 0,
      duration: 0,
      instructor: '',
      rating: 0
    };
    const modal = bootstrap.Modal.getInstance(document.getElementById('createCourseModal'));
    modal.hide();
  }

  openCreateModal(): void {
    const modalEl = document.getElementById('createCourseModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}
