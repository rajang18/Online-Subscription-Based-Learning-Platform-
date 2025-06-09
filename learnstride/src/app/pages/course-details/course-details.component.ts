import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  courseId: any;
  course: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log("this.coursId",this.courseId)
    this.loadCourseDetails();
  }

  loadCourseDetails(): void {
    this.http.get(`https://localhost:7109/api/courses/${this.courseId}`)
      .subscribe({
        next: (data: any) => this.course = data,
        error: err => {
          console.error('Error loading course:', err);
          this.course = null;
        }
      });
  }

  addToCart(): void {
    let response = this.cartService.addToCart(this.course);
    if(response) alert(`${this.course.title} has been added to your cart!`);
  }

  goBack(): void {
    history.back();
  }
}
