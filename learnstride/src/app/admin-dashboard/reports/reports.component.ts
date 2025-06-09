import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../../services/reports.services';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit, AfterViewInit {
  reportMetrics: { label: string; value: number; icon: string }[] = [];

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getAllMetrics().subscribe(data => {
      this.reportMetrics = [
        { label: 'Total Users', value: data.totalUsers, icon: 'bi bi-people text-primary' },
        { label: 'Total Courses', value: data.totalCourses, icon: 'bi bi-book text-success' },
        { label: 'Active Subscriptions', value: data.totalSubscriptions, icon: 'bi bi-credit-card text-warning' },
       
      ];

      // Once metrics are loaded, draw the chart
     this.loadChart();
this.loadPieChart();

    });
  }

  ngAfterViewInit(): void {
    // Chart will be drawn once data is ready from the API
  }

  loadChart(): void {
    const canvas = document.getElementById('reportChart') as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.reportMetrics.map(m => m.label),
        datasets: [{
          label: 'Platform Metrics',
          data: this.reportMetrics.map(m => m.value),
          backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#0dcaf0']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    });

    
  }
  loadPieChart(): void {
  const canvas = document.getElementById('subscriptionPieChart') as HTMLCanvasElement;
  if (!canvas) return;

  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: ['Active', 'Expired', 'Cancelled'],
      datasets: [{
        label: 'Subscriptions',
        data: [60, 25, 15], 
        backgroundColor: ['#198754', '#ffc107', '#dc3545']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

}
