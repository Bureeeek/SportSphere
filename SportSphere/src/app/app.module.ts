import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Routing-Modul importieren

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { CreateComponent } from './create/create.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AccountComponent,
    CreateComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  // Das Routing-Modul wird weiterhin benötigt
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
