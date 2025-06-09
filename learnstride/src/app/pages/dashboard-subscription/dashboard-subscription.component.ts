import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { StripeService } from '../../services/stripe.service';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-dashboard-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-subscription.component.html'
})
export class DashboardSubscriptionComponent implements OnInit {
  promoCode: string = '';
  subscription: any = null;
  userID: number = 0;
  cartItems: any[] = [];
validPromoCodes: string[] = ['rajan100', 'rajan200', 'rajan300'];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private stripeService: StripeService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userID = user.userID || 0;

    this.route.queryParams.subscribe(params => {
      if (params['success'] && params['sid']) {
        const sessionId = params['sid'];
        this.confirmPayment(sessionId);
      }

      if (params['canceled']) {
        alert(' Payment was cancelled. Try again.');
      }
    });

    this.loadSubscription();
  }

  confirmPayment(sessionId: string): void {
    this.stripeService.confirmPayment(sessionId).subscribe({
      next: () => {
        alert('🎉 Subscription activated successfully!');
        this.loadSubscription();
      },
      error: (error) => {
        alert(`❌ Failed to activate subscription: ${error?.error || 'Unknown error'}`);
      }
    });
  }

  loadSubscription(): void {
    this.subscriptionService.getSubscriptionsByUser(this.userID).subscribe({
      next: (data) => {
        const active = data.find(s => s.status === 'Active' || s.status === 'Cancelled');
        if (active) {
          this.subscription = active;
        }
      },
      error: (err) => {
        console.error('Failed to load subscription:', err);
      }
    });
  }

  


  extendSubscription(): void {
    if (!this.subscription) return;
    const confirmExtend = confirm('⏳ Extend your subscription by 30 days?');
    if (confirmExtend) {
      const id = this.subscription.subscriptionID;
      this.http.put(`https://localhost:7109/api/subscription/extend/${id}`, {}).subscribe(() => {
        this.loadSubscription();
        alert('✅ Subscription extended!');
      });
    }
  }

  cancelSubscription(): void {
    if (!this.subscription) return;
    const confirmCancel = confirm('❌ Cancel your subscription?');
    if (confirmCancel) {
      const id = this.subscription.subscriptionID;
      this.http.put(`https://localhost:7109/api/subscription/cancel/${id}`, {}).subscribe(() => {
        this.loadSubscription();
        alert('❌ Subscription cancelled.');
      });
    }
  }

 redeemCode(): void {
  const trimmedCode = this.promoCode.trim().toLowerCase();

  if (!trimmedCode) {
    alert('⚠️ Please enter a promo code!');
    return;
  }

  if (!this.validPromoCodes.includes(trimmedCode)) {
    alert(' Invalid promo code!');
    return;
  }

  //  Send request to extend subscription
  const id = this.subscription.subscriptionID;
  this.http.put(`https://localhost:7109/api/subscription/extend/${id}`, {})
    .subscribe({
      next: () => {
        alert(`🎉 Promo code "${trimmedCode}" applied! Subscription extended by 30 days.`);
        this.promoCode = '';
      },
      error: () => {
        alert(' Something went wrong while applying the promo code.');
      }
    });
}
}



