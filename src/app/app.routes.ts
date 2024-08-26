import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimatorComponent } from './estimator/estimator.component';
import { UserCheckComponent } from './user-check/user-check.component';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { NavigationEffects } from './store/navigation/navigation.effects';

export const routes: Routes = [
  { path: 'estimator', component: EstimatorComponent },
  { path: 'login', component: UserCheckComponent },
  // autres routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes),EffectsModule.forRoot([NavigationEffects]),BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}