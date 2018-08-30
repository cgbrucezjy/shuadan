import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BougtDialogComponent } from '../bougt-dialog/bougt-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { VenmoDialogComponent } from '../venmo-dialog/venmo-dialog.component';

@Component({
  selector: 'app-sd-card',
  templateUrl: './sd-card.component.html',
  styleUrls: ['./sd-card.component.scss']
})
export class SdCardComponent implements OnInit, OnChanges {

  @Input('product')
  product
  @Input('isAdmin')
  isAdmin
  @Input('userProfile')
  userProfile
  @Input('bought')
  isBought
  @Input('boughtItems')
  boughtItems
  @Input('reviewed')
  isReviewed
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.isReviewed,this.isBought)
    this.userProfile = this.userProfile ? JSON.parse(this.userProfile) : null
    
    this.product.imgUrl = this.createPublicFileURL("products/"+this.product.ASIN+".png")
    //console.log(this.boughtItems)
  }
  gotoAmazon()
  {
    window.open(this.product.url, "_system");
  }
  reviewed() {
    //this.dialog.open(VenmoDialogComponent)
    let boughtItems = this.boughtItems.filter(i=>i.ASIN==this.product.ASIN && i.reviewed==false)
    if(boughtItems.length==1){
      const dialogRef = this.dialog.open(BougtDialogComponent, {
        data: {product:this.product,userProfile:this.userProfile,boughtItem:boughtItems[0]},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result && result.success)
        {
          this.dialog.open(VenmoDialogComponent)
        }
      });
    }
    else{
      console.log(boughtItems)
    }

  }
  bought()
  {
    const dialogRef = this.dialog.open(BougtDialogComponent, {
      data: {product:this.product,userProfile:this.userProfile,justBought:true},
    });

  }
  updateDialog()
  {
    const updateDialogRef =  this.dialog.open(UpdateDialogComponent, {
      data: this.product,
    });

    updateDialogRef.afterClosed().subscribe(result => {
      this.product.imgUrl = this.createPublicFileURL("products/"+this.product.ASIN+".png")
      console.log(`Dialog result: ${result}`);
    });
  }
  createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/monkey-deal-5cd79.appspot.com/${encodeURIComponent(storageName)}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.userProfile;
    setTimeout(()=>{
      this.userProfile = currentItem && currentItem.currentValue == "null" ? false : this.userProfile
      // if(changes.boughtItems)
      //   this.boughtItems = changes.boughtItems.currentValue
      // if(changes.isBought)  
      //   this.isBought = changes.isBought.currentValue
      // console.log(this.isBought)
    })
  }
}
