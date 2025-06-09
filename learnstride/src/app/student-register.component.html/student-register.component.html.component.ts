import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-student-register.component.html',
  imports: [FormsModule,CommonModule,RouterOutlet],
  templateUrl: './student-register.component.html.component.html',
  styleUrl: './student-register.component.html.component.css'
})
export class StudentRegisterComponentHtmlComponent {
   constructor(private http: HttpClient, private router: Router) {}

  // Form model
  student = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Messages
  errorMessage = '';
  successMessage = '';

  // Password match check
  get passwordMismatch(): boolean {
    return (
      this.student.password !== '' &&
      this.student.confirmPassword !== '' &&
      this.student.password !== this.student.confirmPassword
    );
  }

  // Registration function
  register() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.passwordMismatch) {
      this.errorMessage = '❌ Passwords do not match.';
      return;
    }

    const payload = {
      fullName: this.student.fullName,
      email: this.student.email,
      password: this.student.password
    };

    this.http.post('https://localhost:7109/api/Auth/register', payload).subscribe({
      next: (res) => {
        this.successMessage = '✅ Registration successful!';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = '❌ Registration failed. Try again.';
        console.error(err);
      }
    });

    
  }
  goBack() {
  this.router.navigate(['/']); // change route as needed
}

}