import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/view/home/home.component';
import { CrudItensComponent } from './components/view/crud-itens/crud-itens.component';
import { CreateComponent } from './components/list/create/create.component';
import { UpdateComponent } from './components/list/update/update.component';
import { ChangeStatusComponent } from './components/list/change-status/change-status.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {
      path: "",
      component: HomeComponent
    },
    {
      path: "item",
      component: CrudItensComponent
    },
    {
      path: "item/create",
      component: CreateComponent
    },
    {
      path: "item/update/:id",
      component: UpdateComponent
    },
    {
      path: "item/change/:id",
      component: ChangeStatusComponent
    },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  
  }
  