import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { appStateRaducer } from './app-state-reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  appStateReducer:appStateRaducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
