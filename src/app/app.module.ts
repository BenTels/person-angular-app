import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './app-state/app.reducers';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { NavigationComponentComponent } from './navigation-component/navigation-component.component';
import { PersonDisplayComponentComponent } from './person-display-component/person-display-component.component';
import { AppRoutingModule } from './app-routing.module';
import { NewPersonComponent } from './new-person/new-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { EditableListComponent } from './editable-list/editable-list.component';
import { FormsModule } from '@angular/forms';
import { EditablePhonenumberListComponent } from './editable-phonenumber-list/editable-phonenumber-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    NavigationComponentComponent,
    PersonDisplayComponentComponent,
    NewPersonComponent,
    EditPersonComponent,
    EditableListComponent,
    EditablePhonenumberListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({rootReducer}, {}),
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
