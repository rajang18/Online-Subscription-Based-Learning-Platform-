import { Component, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
@Output() loginClick = new EventEmitter<void>();

  openLogin() {
    this.loginClick.emit();
  }
}
