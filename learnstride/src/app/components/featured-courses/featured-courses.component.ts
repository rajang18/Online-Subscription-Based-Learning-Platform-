import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-featured-courses',
  standalone: true,
  imports: [NgFor],
  templateUrl: './featured-courses.component.html',
  styleUrls: ['./featured-courses.component.css']
})
export class FeaturedCoursesComponent {
  @Output() loginClick = new EventEmitter<void>();

  courses = [
    {
      title: 'Complete React Development',
      instructor: 'by Sarah Johnson',
      rating: 4.8,
      reviews: 1250,
      duration: '12 Hours',
      price: '₹999'
    },
    {
      title: 'Business Mastery 101',
      instructor: 'by John Smith',
      rating: 4.7,
      reviews: 980,
      duration: '10 Hours',
      price: '₹799'
    },
    {
      title: 'Creative Graphic Design',
      instructor: 'by Priya Mehta',
      rating: 4.9,
      reviews: 1100,
      duration: '8 Hours',
      price: '₹699'
    }
  ];

  openLogin() {
    this.loginClick.emit();
  }
}
