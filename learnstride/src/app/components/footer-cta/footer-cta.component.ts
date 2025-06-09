import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer-cta',
  standalone: true,
  templateUrl: './footer-cta.component.html',
  styleUrls: ['./footer-cta.component.css']
})
export class FooterCtaComponent {
  @Output() loginClick = new EventEmitter<void>();

  openLogin() {
    this.loginClick.emit();
  }
}
