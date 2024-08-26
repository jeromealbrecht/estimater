import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estimator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './estimator.component.html',
  styleUrl: './estimator.component.css'
})
export class EstimatorComponent {
  baseRate = 300;
  hourlyRate: number = 0;
  dailyRate: number = 0;
  hours: number = 0;
  total: number = 0;

  calculateEstimate() {
    if (this.hourlyRate > 0) {
      this.total = this.hourlyRate * this.hours;
    } else if (this.dailyRate > 0) {
      this.total = this.dailyRate * (this.hours / 8); // Supposons 8 heures par jour
    }
    if (this.total < this.baseRate) {
      this.total = this.baseRate;
    }
  }
}
