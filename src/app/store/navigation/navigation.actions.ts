// navigation.actions.ts
import { createAction, props } from '@ngrx/store';

export const navigate = createAction(
  '[Navigation] Navigate',
  props<{ url: string }>()
);