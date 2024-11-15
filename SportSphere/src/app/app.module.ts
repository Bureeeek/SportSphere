import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // für API-Anfragen

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { CreateComponent } from './create/create.component';
import { NewsComponent } from './news/news.component';  // Deine Sportnachrichten-Komponente

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AccountComponent,
    CreateComponent,
    NewsComponent  // Hier fügst du alle deine Komponenten hinzu
  ],
  imports: [
    BrowserModule,
    HttpClientModule  // Wenn du HTTP-Anfragen machst, musst du dies importieren
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
