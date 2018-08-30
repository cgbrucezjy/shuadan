import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { sdFirebase } from '../../services/sd-firebase';
import { take, finalize } from '../../../../node_modules/rxjs/operators';
import { UserService } from '../../services/user-service';
@Component({
  selector: 'app-bougt-dialog',
  templateUrl: './bougt-dialog.component.html',
  styleUrls: ['./bougt-dialog.component.scss']
})
export class BougtDialogComponent implements OnInit {
  couponCode
  orderId
  email
  price
  error
  payment
  selectedFile: File;
  uploadProgress
  justBought
  uploading
  boughtItem
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public fb:sdFirebase,
  public dialogRef: MatDialogRef<BougtDialogComponent>,public userServce:UserService) { }

  ngOnInit() {
    this.boughtItem = this.data.boughtItem
    console.log(this.data.boughtItem)
    this.email = this.data.userProfile.email
    this.justBought = this.data.justBought
  }
  submit()
  {
    this.fb.checkSecret().pipe(take(1)).subscribe(checkSecret=>{
      console.log(checkSecret)
      if(this.justBought && this.couponCode !=checkSecret)
      {
        this.error = "Wrong coupon code"
        return;
      }
      else
      {
        if(this.payment && this.selectedFile)
        {
          const updateData = {
            payment:this.payment,
            reviewed:true,
            ASIN:this.boughtItem.ASIN
          }
          this.uploadImage("data.orderId")
          this.fb.updateOrder(updateData,this.boughtItem.orderKey)
          this.userServce.updateUserOrder(updateData)
          this.uploadProgress.pipe(
            finalize(()=>{
              this.dialogRef.close({success:true})
            })
          ).subscribe(()=>{
            this.uploading = true;
          })
        }
        else
        {
          if(this.email && this.price && this.justBought && this.orderId)
          {
            this.fb.product(this.data.product.ASIN).pipe(take(1)).subscribe(pd=>{
              if(pd.quantity>0)
              {
                this.fb.updateProductQuantity(this.data.product,pd.quantity-1)
                const data = {
                  orderId:this.orderId,
                  email:this.email,
                  ASIN:this.data.product.ASIN,
                  price:this.price,
                  reviewed:false
                  //payment:this.payment,
                  //imgName:this.orderId+"."+this.selectedFile.name.split('.')[this.selectedFile.name.split('.').length-1]
                }
                console.log(data)
                let orderKey = this.fb.saveOrder({...data,uid:this.userServce.getUid()}).ref.key
                this.userServce.saveUserOrder({...data,orderKey})
                this.justBought = false;
                this.dialogRef.close({success:false})
              }
              else
              {
                this.error = "Not Enough Quantity"
              }
            })
            
          }
          else
          {
            this.error = "Please fill in every field"
          }
          
        }
      }
    })
    


  }
  onFileChanged(event) {
    this.selectedFile= event.target.files[0]
    console.log(this.selectedFile)
  }
  uploadImage(orderId)
  {

      const storageRef = this.fb
      .pushUpload("/screenshots/"+orderId)
  
      let uploadTask = storageRef.put(this.selectedFile);
      this.uploadProgress = uploadTask.percentageChanges()
  }
}
