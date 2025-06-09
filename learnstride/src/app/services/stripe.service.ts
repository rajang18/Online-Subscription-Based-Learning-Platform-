import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StripeService {

  private apiUrl = 'https://localhost:7109/api/Stripe';
  constructor(private http: HttpClient) {}

 createCheckoutSession(data: { courseIDs: number[]; userID: number }) {
  return this.http.post<{ id: string }>('https://localhost:7109/api/stripe/create-checkout-session', data);
}

confirmPayment(sessionId: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/ConfirmPayment?sessionId=${sessionId}`, {});
  }

  //   createCheckoutSession(courseIDs: number[]): Observable<{ id: string }> {
  //   return this.http.post<{ id: string }>(
  //     'https://localhost:7109/api/stripe/create-checkout-session',
  //     { courseIDs }
  //   );
  // }
}
