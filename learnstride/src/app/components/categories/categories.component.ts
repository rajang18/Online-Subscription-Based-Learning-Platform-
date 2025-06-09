import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
categories = [
    { title: 'Technology', count: 45, icon: '💻' },
    { title: 'Business', count: 32, icon: '📈' },
    { title: 'Design', count: 28, icon: '🎨' },
    { title: 'Health & Wellness', count: 22, icon: '🧘' },
    { title: 'Marketing', count: 35, icon: '📣' },
    { title: 'Data Science', count: 18, icon: '📊' }
  ];
}
