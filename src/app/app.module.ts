import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { NavigationComponentComponent } from './navigation-component/navigation-component.component';
import { PersonDisplayComponentComponent } from './person-display-component/person-display-component.component';
import { rootReducer } from './app-state/app.reducers';


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
    StoreModule.forRoot({rootReducer}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
