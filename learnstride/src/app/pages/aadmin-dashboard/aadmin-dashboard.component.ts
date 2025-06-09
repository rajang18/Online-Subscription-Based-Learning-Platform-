import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-aadmin-dashboard',
  standalone: true,
  imports: [RouterOutlet], // ✅ Add this line
  templateUrl: './aadmin-dashboard.component.html',
  styleUrls: ['./aadmin-dashboard.component.css']
})
export class AadminDashboardComponent {

  constructor(private router: Router) {}


  
  navigateTo(path: string): void {
    this.router.navigate(['/admin-dashboard', path]);
  }


  
  // Log out the user and navigate to the home page
  logout() {
    localStorage.removeItem('token');  // Clear any stored authentication token
    this.router.navigate(['/']);  // Redirect to the home page or login page
  }
}
