import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-overview.component.html'
})
export class DashboardOverviewComponent implements OnInit {

  // 🔐 State variables
  userId: number = 0;
  studentName: string = '';
  studentEmail: string = '';

  editName: string = '';
  editEmail: string = '';

  isEditing: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

 ngOnInit(): void {
  const token = this.authService.getToken();
  console.log('Raw token:', token); // ✅ STEP 1

  const decoded = this.authService.decodeToken(token);
  console.log('Decoded token:', decoded); // ✅ STEP 2

  const id = this.authService.getUserId();
  console.log('Extracted userId from token:', id); // ✅ STEP 3

  if (id) {
    this.userId = id;
    this.userService.getUserById(this.userId).subscribe(user => {
      console.log('User fetched from API:', user); // ✅ STEP 4

      this.studentName = user.fullName;
      this.studentEmail = user.email;
    });
  }
}


  startEdit() {
    this.editName = this.studentName;
    this.editEmail = this.studentEmail;
    this.isEditing = true;
  }

  saveChanges() {
  const payload = {
    fullName: this.editName,
    email: this.editEmail
  };

  console.log('Sending payload:', payload); // debug

  this.userService.updateUser(this.userId, payload).subscribe({
    next: () => {
      this.studentName = this.editName;
      this.studentEmail = this.editEmail;
      this.isEditing = false;
      alert("Profile updated!");
    },
    error: (err) => {
      console.error('Update error:', err);
      alert("Failed to update profile");
    }
  });
}



  cancelEdit() {
    this.isEditing = false;
  }
}
