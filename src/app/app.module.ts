import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { NavigationComponentComponent } from './navigation-component/navigation-component.component';
import { PersonDisplayComponentComponent } from './person-display-component/person-display-component.component';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { personsReducer } from './person/persons-reducer'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    NavigationComponentComponent,
    PersonDisplayComponentComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({ allPersonsReducer: personsReducer }, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
