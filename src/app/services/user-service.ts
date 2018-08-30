import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from "@angular/router";
import { AUTH_CHANGE, AppState } from "../reducers/app-state-reducer";
import { Store } from "@ngrx/store";
import { MatSnackBar } from "@angular/material";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class UserService {
    constructor(public afAuth:AngularFireAuth,
        public router:Router,
        public store:Store<AppState>,
        public snackBar:MatSnackBar,
        public db:AngularFireDatabase
    ){


    }
    getUid()
    {
        return this.afAuth.auth.currentUser.uid
    }
    saveUserOrder(order)
    {
        let uid = this.afAuth.auth.currentUser.uid
        this.db.object("users/"+uid+"/orders/"+order.ASIN).set(order)
    }
    getOrders()
    {
        let uid = this.afAuth.auth.currentUser.uid
        return this.db.list("users/"+uid+"/orders").valueChanges()as Observable<Order[]>;
    }
    updateUserOrder(updateOrder)
    {
        let uid = this.afAuth.auth.currentUser.uid
        this.db.object("users/"+uid+"/orders/"+updateOrder.ASIN).update(updateOrder)
    }
}

export interface Order{
    ASIN: string;
    couponCode: string;
    email: string;
    orderId: string;
    price: number;
    reviewed:boolean;
    imgName: string;
}