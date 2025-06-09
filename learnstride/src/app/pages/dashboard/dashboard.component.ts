import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PlatformService } from '../../services/platform.service'; 
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  platformName: string = '';
  platformIcon: string = '';

  constructor(
    private router: Router,
    private platformService: PlatformService
  ) {}

  
  ngOnInit(): void {

    this.platformService.platformName$.subscribe(name => {
      this.platformName = name;
    });

    this.platformService.platformIcon$.subscribe(icon => {
      this.platformIcon = icon;
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
