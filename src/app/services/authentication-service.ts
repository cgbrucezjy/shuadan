import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from "@angular/router";
import { AUTH_CHANGE, AppState } from "../reducers/app-state-reducer";
import { Store } from "@ngrx/store";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class AuthService {
    constructor(public afAuth:AngularFireAuth,public router:Router,public store:Store<AppState>,public snackBar:MatSnackBar){
        this.afAuth.authState.subscribe(user=>{
            if(user)
            {
                console.log(user)
                this.store.dispatch({
                    type:AUTH_CHANGE,
                    payload:{uid:user.uid,displayName:user.displayName,email:user.email,phone:user.phoneNumber,photo:user.photoURL}
                  })
                this.router.navigate(['/home'], { replaceUrl: true });
            }
            else{
                this.store.dispatch({
                    type:AUTH_CHANGE,
                    payload:null
                })
                this.snackBar.open("User is not logged in","",{ duration: 2000 });
            }
        })

    }

    doGoogleLogin(){
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    doFbLogin(){
        return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }
    logout() {
        this.afAuth.auth.signOut();
    }
}

