import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {
  // items: ShoppingCartItem[];
   constructor(public items: ShoppingCartItem[]) {
   }

   get productIds() {
    return Object.keys(this.items);
   }

   get totalItemsCount() {
    let count = 0;
    let a={};
    for(let productId in this.items){

      count += this.items[productId].quantity;
  
    }
      return count;
   }
}