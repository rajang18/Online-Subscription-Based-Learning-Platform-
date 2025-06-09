import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../../dialog/dialog.component';  // Adjust path if needed

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    DialogComponent
  ],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();
  loginForm: FormGroup;
  selectedRole: 'student' | 'admin' = 'student';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  selectRole(role: 'student' | 'admin') {
    this.selectedRole = role;
  }

  close() {
    this.closed.emit();
  }

  login() {
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      console.log('Sending payload to API:', payload);

      this.authService.login(payload).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          const decoded: any = this.decodeToken(res.token);
          const userId = res?.userId;
          localStorage.setItem('user', JSON.stringify({
            userID: res.userId,
            fullName: res.fullName
          }));

          console.log('Logged in userId:', userId);

          if (userId == 1) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }

          this.close();
        },
        error: (err) => {
          
          this.dialog.open(DialogComponent, {
            data: { message: 'Invalid credentials' }
          });
          console.error(err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  redirectToSignup(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }
}
