import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import * as NavigationActions from './navigation.actions';
import { EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NavigationActions.navigate),
        tap((action: ReturnType<typeof NavigationActions.navigate>) => 
          this.router.navigate([action.url])
        ), 
        catchError((error) => {
          console.error('Error in NavigationEffects:', error);
          return EMPTY; // or handle the error as needed
        })
      ),
    { dispatch: false }
  );
}