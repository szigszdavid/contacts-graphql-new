import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { GetByIdComponent } from './get-by-id/get-by-id.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    {
      path: "",
      component: ListComponent
    },
    {
      path: "contacts",
      component : ListComponent
    },
    {
      path: "contacts/:id/edit",
      component: EditComponent
    },
    {
      path: "contacts/add",
      component : EditComponent
    },
    {
      path: "contacts/:id",
      component: GetByIdComponent,
    },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
