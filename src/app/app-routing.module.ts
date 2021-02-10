import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:"", redirectTo:"currency", pathMatch:"full"},
  {path:"currency", loadChildren: ()=> import('./currency/currency.module').then(m => m.CurrencyModule)},
  {path:"length", loadChildren: ()=> import('./length/length.module').then(m => m.LengthModule)},
  {path:"**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
