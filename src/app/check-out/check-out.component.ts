import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  shipping={};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
   let cart$ = await this.shoppingCartService.getCart();
   this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
   this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
      
  }

  async ngOnDestroy() {
    this.cartSubscription.unsubscribe();   
    this.userSubscription.unsubscribe();
   }


  placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart);
   

    this.orderService.storeOrder(order);
  }
}
