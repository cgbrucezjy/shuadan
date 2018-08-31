import { Component, OnInit, Inject } from '@angular/core';
import { sdFirebase, Upload } from '../../services/sd-firebase';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UploadTaskSnapshot } from 'angularfire2/storage/interfaces';
import { finalize } from 'rxjs/operators';
import { BougtDialogComponent } from '../bougt-dialog/bougt-dialog.component';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {
  selectedFile: File;
  uploadProgress
  downloadUrl
  price
  quantity
  message
  ASN
  url
  SKU
  error
  constructor(
    public service:sdFirebase,
    @Inject(MAT_DIALOG_DATA) public product: any,
    public dialogRef: MatDialogRef<BougtDialogComponent>
  ) { }

  ngOnInit() {
  }
  onFileChanged(event) {
    this.selectedFile= event.target.files[0]
    console.log(this.selectedFile)
  }
  uploadImage()
  {
    let asin = this.product? this.product.ASIN : this.ASN
    if(!asin)
    {
      this.error = "Please enter an ASIN first"
    }
    else
    {
      const storageRef = this.service
      .pushUpload('/products/'+asin)
  
      let uploadTask = storageRef.put(this.selectedFile);
      this.uploadProgress = uploadTask.percentageChanges()
    }

  }
  remove()
  {
    this.service.removeItem(this.product.ASIN)
    this.dialogRef.close()
  }
  submit()
  {
    if(this.product)
    {
      console.log(this.product)
      let _price = this.price?this.price:this.product.Price;
      let _quantity = this.quantity?this.quantity:this.product.quantity
      this.service.updateItem(this.product.ASIN,_price,_quantity).then(()=>{
        this.dialogRef.close()
      })
    }
    else
    {
      if(this.price && this.quantity && this.ASN && this.url)
      {
        this.service.saveItem(this.ASN,this.price,this.quantity,this.url,this.message,this.SKU).then(()=>{
          this.dialogRef.close()
        })
      }
      else
      {
        this.error = "Please fillin all required form"
      }
    }

  }
}
