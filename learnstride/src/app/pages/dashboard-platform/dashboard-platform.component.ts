import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-dashboard-platform',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard-platform.component.html',
  styleUrl: './dashboard-platform.component.css'
})
export class DashboardPlatformComponent implements OnInit {
 
  platformList: any[] = [];

  constructor(private platformService: PlatformService) {}

 selectedPlatformName: string = ''; // Default is empty, means nothing selected

ngOnInit(): void {
  this.platformService.getPlatforms().subscribe({
    next: (data) => {
      this.platformList = data;
      // Don't auto-select anything — keep blank so "Select Platform" appears
    },
    error: () => {
      alert('❌ Failed to load platformList from server');
    }
  });
}

switchPlatform() {
  if (!this.selectedPlatformName) return; // If empty, do nothing

  const selectedPlatform = this.platformList.find(
    p => p.platformID == this.selectedPlatformName
  );

  if (selectedPlatform) {
    this.platformService.updatePlatform(selectedPlatform.platformName, selectedPlatform.icon);
  }
}

get selectedPlatform() {
  return this.platformList.find(p => p.platformID == this.selectedPlatformName);
}
}