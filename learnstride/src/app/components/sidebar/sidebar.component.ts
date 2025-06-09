import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 currentRoute = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('/').pop()!;
    });
  }

  navigateTo(path: string) {
    this.router.navigate([`/dashboard/${path}`]);
  }

  isActive(path: string): boolean {
    return this.currentRoute === path;
  }
}