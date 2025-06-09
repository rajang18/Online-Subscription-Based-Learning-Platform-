import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from '../../services/stripe.service';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';

declare var Stripe: any;

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule, FormsModule]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  stripeRedirect: boolean = false;
  userID: number = 0;

  constructor(
    private cartService: CartService,
    private stripeService: StripeService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.userID = user.userID;    
  this.cartItems = this.cartService.getCartItems();
 } 

getTotal(): number {
  return this.cartService.getTotal();
}

remove(index: number): void {
  this.cartService.removeFromCart(index);
}

payNow(): void {
  this.stripeRedirect = true;
const courseIDs = this.cartItems.map(c => c.courseID); 
 const userID = this.userID; 
console.log(userID)
  this.stripeService.createCheckoutSession({courseIDs,userID}).subscribe((res) => {
    const stripe = Stripe('pk_test_51RTyvMQsuevDK2DPbZCkAQOpDMa2BRbBbK0lM4n0yO0LSE5tsEqrugd4Llu8D8XSOsBuInzZxTsXUr4TtPPAdqnG00KfkBOxWk');
    stripe.redirectToCheckout({ sessionId: res.id }).then((res: any) => {
      console.log("response", res);
      this.stripeRedirect = false;
    }).catch((err: any) => {
      console.error('Stripe error:', err);
      this.stripeRedirect = false;
    });
  });
}
}