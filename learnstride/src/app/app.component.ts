import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './dialog/dialog.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatDialogModule,MatButtonModule,DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learnstride';
}
