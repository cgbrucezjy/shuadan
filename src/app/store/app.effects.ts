import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { AUTH_CHANGE, AuthChangeAction, LOGIN_STATUS } from '../reducers/app-state-reducer';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class AppEffects {

  constructor(private actions$: Actions,public db: AngularFireDatabase) {}
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<AuthChangeAction>(AUTH_CHANGE),
    mergeMap((action:any) =>{
        const profile = action.payload
        if(action.payload)
        {
          const itemsRef = this.db.object('users/'+profile.uid);
          return from(itemsRef.update({...profile})).pipe(
            map(data =>({ type: LOGIN_STATUS, payload: {success:true} })),
            catchError((error) => of({ type: LOGIN_STATUS,payload:{success:false,...error} }))
          );
        }
        else
        {
          return of({ type: LOGIN_STATUS,payload:{success:false} })
        }
      }
    )
  );
}
