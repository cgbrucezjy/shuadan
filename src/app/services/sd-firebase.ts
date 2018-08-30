import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from "angularfire2/storage";

@Injectable()
export class sdFirebase {
    private basePath:string = '/products';
    constructor(public db: AngularFireDatabase,private storage: AngularFireStorage){

    }
    products():Observable<Product[]>{
        return this.db.list("catelog").valueChanges()
        .pipe(
            map(products=>products.filter((product:Product)=>product.quantity>0))
        )as Observable<Product[]>;
    }
    product(key):Observable<Product>
    {
        return this.db.object('catelog/'+key).valueChanges()as Observable<Product>;
    }
    saveOrder(order)
    {
        return this.db.list("ordered-products/"+order.ASIN).push(order)
    }
    updateOrder(updateOrder,orderKey)
    {
        this.db.object("ordered-products/"+updateOrder.ASIN+"/"+orderKey).update(updateOrder)   
    }
    updateProductQuantity(product,newQuantity)
    {
        this.db.object("catelog/"+product.ASIN).update({quantity:newQuantity})
    }
    checkSecret()
    {
        return this.db.object("admin/secret").valueChanges()
    }
    pushUpload(asn:string) {
        let storageRef = this.storage.ref(`${asn}.png`);
        
    
        return storageRef
        
    }
    updateItem(asn,price,quantity)
    {
        console.log(asn,price,quantity)
        return this.db.object('catelog/'+asn).update({
            Price:price,
            quantity
        })
    }
    saveItem(ASIN,Price,quantity,url,message?,SKU?)
    {
        return this.db.object('catelog/'+ASIN).update({
            Price,
            quantity,
            message,
            ASIN,
            url,
            SKU
        })
    }
}

export interface Product{
    ASIN: string;
    Country: string;
    Price: number;
    SKU: string;
    message: string;
    quantity: number;
    url: string;
}

export class Upload {

    $key: string;
    file:File;
    name:string;
    url:string;
    progress:number;
    createdAt: Date = new Date();
  
    constructor(file:File) {
      this.file = file;
    }
  }