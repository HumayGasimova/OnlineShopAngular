import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    })
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');

    if(!cartId){
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return this.getCart(result.key);

      // this.create().then(res => {
      //   localStorage.setItem('cartId', res.key);
      //   return this.getCart(res.key);
      // })
    }else{
      return this.getCart(cartId);
    }    
  }
}
