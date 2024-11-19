import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { CreateComponent } from './create/create.component';
import { NewsComponent } from './news/news.component';

export const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'account', component: AccountComponent },
  { path: 'create', component: CreateComponent },
  { path: 'news', component: NewsComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' }
];
