import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private baseUrl = 'https://localhost:7109/api/Subscription'; 

  constructor(private http: HttpClient) {}

  getAllSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
   getSubscriptionsByUser(userID: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-user?userID=${userID}`);
  }

 extendSubscription(id: number) {
  return this.http.put<any>(`https://localhost:7109/api/Subscription/extend/${id}`, {});
}

 cancelSubscription(id: number) {
  return this.http.put(`${this.baseUrl}/cancel/${id}`, {});
}
  createSubscription(subscription: any, token: string) {
    return this.http.post(this.baseUrl, subscription, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
