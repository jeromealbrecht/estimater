import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EstimatorComponent } from './estimator/estimator.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EstimatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estimater';
}
