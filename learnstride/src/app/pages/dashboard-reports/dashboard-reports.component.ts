import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-reports.component.html',
  styleUrl: './dashboard-reports.component.css'
})
export class DashboardReportsComponent implements AfterViewInit {
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;
  @ViewChild('doughnutChartCanvas') doughnutChartCanvas!: ElementRef;

  progressReport = [
    { title: 'React Development', hours: 24, progress: 95 },
    { title: 'Digital Marketing', hours: 18, progress: 100 },
    { title: 'UI/UX Design', hours: 16, progress: 65 },
    { title: 'JavaScript Advanced', hours: 12, progress: 45 }
  ];

  ngAfterViewInit() {
    // Bar Chart
    new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.progressReport.map(c => c.title),
        datasets: [{
          label: 'Progress %',
          data: this.progressReport.map(c => c.progress),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Completion %'
            }
          }
        }
      }
    });

    // Doughnut Chart
    new Chart(this.doughnutChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.progressReport.map(c => c.title),
        datasets: [{
          label: 'Hours Spent',
          data: this.progressReport.map(c => c.hours),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
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
