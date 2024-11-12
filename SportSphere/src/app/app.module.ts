import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Importiere das Routing-Modul
import { RouterModule } from '@angular/router';  // Füge RouterModule hinzu

@NgModule({
  declarations: [
    AppComponent,  // Deine Hauptkomponente
    // Weitere Komponenten hier hinzufügen, z.B. NewsComponent, CreateComponent, etc.
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Das Routing-Modul
    RouterModule  // RouterModule zu den Imports hinzufügen
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
