import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { FeaturedCoursesComponent } from '../../components/featured-courses/featured-courses.component';
import { FooterCtaComponent } from '../../components/footer-cta/footer-cta.component';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,HeroComponent,StatsComponent,CategoriesComponent,FeaturedCoursesComponent,FooterCtaComponent,LoginModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 loginModelVisible = false;

openLoginModal() {
  this.loginModelVisible = true;
}

}
