import { Action } from "@ngrx/store";

export interface AppState{
    isAdmin:boolean;
    profile:any;
    loginStatus:any;
}
export const SET_ADMIN = "setAdmin"
export const AUTH_CHANGE = "authChange"
export const LOGIN_STATUS = "loginStatus"
export const LOGIN_FAILED = "loginFailed"
let initialState:AppState={
    isAdmin:false,
    profile:null,
    loginStatus:false,
}
export class AuthChangeAction implements Action {
  readonly type = AUTH_CHANGE;
  payload?: any;
}
export class AdminAction implements Action {
  readonly type = SET_ADMIN;
  payload?: any;
}
export class LoginAction implements Action {
  readonly type = LOGIN_STATUS;
  payload?: any; 
}
export function appStateRaducer(state:AppState = initialState, action: AuthChangeAction | AdminAction |LoginAction) {
    console.log(action)
    switch (action.type) {
      case SET_ADMIN: {
        return {
          ...state,
          isAdmin: action.payload,
        };
      }
      case AUTH_CHANGE: {
        return {
          ...state,
          profile:action.payload
        }
      }
      case LOGIN_STATUS:{
        return {
          ...state,
          loginStatus:action.payload
        }
      }
      default: {
        return state;
      }
    }
  }