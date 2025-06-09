import { AadminDashboardComponent } from './pages/aadmin-dashboard/aadmin-dashboard.component'; 

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardOverviewComponent } from './pages/dashboard-overview/dashboard-overview.component';

import { DashboardMyCoursesComponent } from './pages/dashboard-my-courses/dashboard-my-courses.component';
import { DashboardSubscriptionComponent } from './pages/dashboard-subscription/dashboard-subscription.component';
import { DashboardPlatformComponent } from './pages/dashboard-platform/dashboard-platform.component';
import { DashboardReportsComponent } from './pages/dashboard-reports/dashboard-reports.component';
import { OverviewComponent } from './admin-dashboard/overview/overview.component';
import { ManageCoursesComponent } from './admin-dashboard/manage-course/manage-course.component';
import { SubscriptionsComponent } from './admin-dashboard/subscriptions/subscriptions.component';
import { ReportsComponent } from './admin-dashboard/reports/reports.component';
import { DashboardCoursesComponent } from './pages/dashboard-courses/dashboard-courses.component';
import { StudentRegisterComponentHtmlComponent } from './student-register.component.html/student-register.component.html.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CartComponent } from './pages/cart/cart.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path:'payment-success' , redirectTo:'/dashboard/overview'
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'overview', component: DashboardOverviewComponent },
      { path: 'courses', component: DashboardCoursesComponent},
       { path: 'courses/:id', component: CourseDetailsComponent },
       { path: 'cart', component:  CartComponent},

      { path: 'my-courses', component: DashboardMyCoursesComponent },
      { path: 'subscription', component: DashboardSubscriptionComponent },
      { path: 'platform', component: DashboardPlatformComponent },
      { path: 'reports', component: DashboardReportsComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  },

   {
  path: 'admin-dashboard',
  component: AadminDashboardComponent,
  children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'manage-courses', component:ManageCoursesComponent },
    { path: 'subscriptions', component: SubscriptionsComponent },
    { path: 'reports', component: ReportsComponent }
  ]
},
{ path: 'register', component: StudentRegisterComponentHtmlComponent }

];
