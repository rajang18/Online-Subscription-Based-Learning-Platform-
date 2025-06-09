import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private apiUrl = 'https://localhost:7109/api/Platforms';

  // ✅ Get from localStorage or set default
  private platformNameSubject = new BehaviorSubject<string>(
    localStorage.getItem('platformName') || 'LearnVerse Main'
  );

  private platformIconSubject = new BehaviorSubject<string>(
    localStorage.getItem('platformIcon') || 'bi bi-journal-bookmark'
  );

  // ✅ Expose as observables
  platformName$ = this.platformNameSubject.asObservable();
  platformIcon$ = this.platformIconSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPlatforms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updatePlatform(name: string, icon: string): void {
    localStorage.setItem('platformName', name);
    localStorage.setItem('platformIcon', icon);

    this.platformNameSubject.next(name);
    this.platformIconSubject.next(icon);
  }
}
