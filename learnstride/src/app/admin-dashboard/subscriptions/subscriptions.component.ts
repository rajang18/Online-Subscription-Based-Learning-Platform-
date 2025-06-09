import { CommonModule} from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: any[] = [];

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionService.getAllSubscriptions().subscribe(data => {
     this.subscriptions = data.filter(sub => sub.status === 'Active');
    });
  }

  cancelSubscription(sub: any) {
    console.log(sub)
    if (confirm(`Cancel subscription for ${sub.userName}?`)) {
      
      this.subscriptionService.cancelSubscription(sub.subscriptionID).subscribe(() => {
        sub.status = 'Cancelled';
      });
    
    }
  }
  
}
