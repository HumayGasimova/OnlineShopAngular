import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent{

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  
    constructor(
      private cartService: ShoppingCartService
    ) { }
  
    addToCart() {
      this.cartService.addToCart(this.product);
      // console.log(product.key)
    }
  
    removeFromCart() {
      this.cartService.removeFromCart(this.product);
    }
  
   
}