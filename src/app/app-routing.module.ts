import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonDisplayComponentComponent } from './person-display-component/person-display-component.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';

const routes: Routes = [
  { path: 'display/:id', component: PersonDisplayComponentComponent },
  { path: 'edit/:id', component: EditPersonComponent },
  { path: 'new', component: NewPersonComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
