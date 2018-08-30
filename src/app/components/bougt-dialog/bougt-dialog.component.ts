import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { sdFirebase } from '../../services/sd-firebase';
import { take, finalize } from '../../../../node_modules/rxjs/operators';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public fb:sdFirebase,
  public dialogRef: MatDialogRef<BougtDialogComponent>,) { }

  ngOnInit() {
    console.log(this.data.product.ASIN)
    this.email = this.data.userProfile.email
  }
  submit()
  {
    this.fb.checkSecret().pipe(take(1)).subscribe(checkSecret=>{
      console.log(checkSecret)
      if(this.couponCode !=checkSecret)
      {
        this.error = "Wrong coupon code"
        return;
      }
      else
      {
        if(this.couponCode && this.orderId && this.email && this.price && this.payment && this.selectedFile)
        {
          const data = {
            couponCode:this.couponCode,
            orderId:this.orderId,
            email:this.email,
            ASIN:this.data.product.ASIN,
            price:this.price,
            payment:this.payment,
            imgName:this.orderId+"."+this.selectedFile.name.split('.')[this.selectedFile.name.split('.').length-1]
          }
          console.log(data)
          this.fb.product(data.ASIN).pipe(take(1)).subscribe(pd=>{
            if(pd.quantity>0)
            {
              this.fb.saveOrder(data)
              this.fb.updateProductQuantity(this.data.product,pd.quantity-1)
              this.uploadImage(data.orderId)
              this.uploadProgress.pipe(
                finalize(()=>{
                  this.dialogRef.close({success:true})
                })
              ).subscribe()
              
            }
          })
        }
        else
        {
          this.error = "Please fill in every field"
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