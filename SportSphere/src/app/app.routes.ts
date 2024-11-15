import { Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { CreateComponent } from './create/create.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: 'news', component: NewsComponent },
  { path: 'create', component: CreateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: '**', redirectTo: '/news' }  // Fallback für unbekannte Routen
];
