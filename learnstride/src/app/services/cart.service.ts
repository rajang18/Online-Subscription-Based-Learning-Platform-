import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems: any[] = [];

  addToCart(course: any) {
    const alreadyInCart = this.cartItems.some(item => item.courseID === course.courseID);
    if (!alreadyInCart) {
      this.cartItems.push(course);
      return true;
    }else {
   alert("Course already in cart");
   return false;
  }
  }

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}
