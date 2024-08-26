import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { EstimatorComponent } from './estimator/estimator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EstimatorComponent, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'estimater';

  constructor(private router: Router) {}

  ngOnInit() {
    // (Vous pouvez conserver cette partie si vous en avez besoin pour autre chose)
    this.router.events.pipe(
      tap(event => {
        if (event instanceof NavigationEnd) {
          console.log('Navigation ended:', event.urlAfterRedirects);
        }
      })
    ).subscribe(); 
  }

  // Vous pouvez supprimer la méthode navigateToLog car elle n'est plus nécessaire

  // Cette méthode est suffisante pour naviguer vers /login
  // openLoginPage() {
  //   this.router.navigate(['/login']); 
  // }

  openLoginPage() {
    window.location.href = '/login'; // Naviguer directement avec JavaScript
  }
}