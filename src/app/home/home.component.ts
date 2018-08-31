import { Component, OnInit } from '@angular/core';
import { sdFirebase } from '../services/sd-firebase';
import { ObservableMedia } from '@angular/flex-layout';

import { takeWhile,startWith, map, take, combineLatest } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import { State, select } from '@ngrx/store';
import { AppState } from '../reducers/app-state-reducer';
import { MatDialog } from '@angular/material';
import { UpdateDialogComponent } from '../components/update-dialog/update-dialog.component';
import { Order, UserService } from '../services/user-service';
import { pipe } from '@angular/core/src/render3/pipe';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products
  cols: Observable<number>;
  isAdmin
  userProfile
  boughtItems$:Observable<Order[]>
  boughtItems
  reviewedItemsASIN
  boughtItemsASIN
  constructor(
    public fb:sdFirebase,
    private observableMedia: ObservableMedia,
    public state:State<AppState>,
    public dialog: MatDialog,
    public userService:UserService
  ) { }

  ngOnInit() {
    
    const grid = new Map([
      ["xs", 1],
      ["sm", 2],
      ["md", 2],
      ["lg", 3],
      ["xl", 3]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.observableMedia.asObservable()
    .pipe(
      map(change => {
        console.log(change);
        console.log(grid.get(change.mqAlias));
        return grid.get(change.mqAlias);
      }),
      startWith(start)
    )
    
    this.state.pipe(
      select('appStateReducer'),
      select('isAdmin')
    ).subscribe(isAdmin=>{
      console.log(isAdmin)
      this.isAdmin = isAdmin
    })

    this.state.pipe(
      select('appStateReducer'),
      select('profile')
    ).subscribe(profile=>{
      console.log(profile)
      this.userProfile = profile
      if(this.userProfile && this.userProfile.uid)
      {
        this.boughtItems$ = this.userService.getOrders()
        this.fb.products().pipe(combineLatest(this.boughtItems$)).subscribe((sink)=>{
          let resp = sink[1]
          this.products = sink[0]
          console.log(this.isAdmin)
          this.boughtItemsASIN = resp.filter(i=>!i.reviewed).map(i=>i.ASIN)
          this.reviewedItemsASIN = resp.filter(i=>i.reviewed).map(i=>i.ASIN)
          this.products = this.products//this.products.filter(p=>!this.reviewedItemsASIN.includes(p.ASIN))
          this.boughtItems = resp
        })
      }
      else
      {
        this.fb.products().pipe(take(1)).subscribe((resp)=>{
          this.products = resp
        })
      }

    })
    

  }
  addItem()
  {
    const updateDialogRef =  this.dialog.open(UpdateDialogComponent, {
      data: null,
    });
  }

}
