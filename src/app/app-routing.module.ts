import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from "./product-list/product-list.component";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";
import { CreateProductComponent } from "./create-product/create-product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

import { AuthGuardComponent } from "./services/auth.service";
import { ProductDetailAuthGuardComponent } from "./services/product-detail-auth-guard.service";
import { ProductListGuard } from './services/product-list-guard';

const routes: Routes = [
  {
    path: 'home',
    component: PokemonListComponent, 
  },
  {
    path: 'product',
    component: ProductListComponent, canActivate:[ProductListGuard]
  },
  {
    path: 'detail/:name',
    component: ProductDetailComponent, canActivate:[ProductDetailAuthGuardComponent]
  },
  {
    path: 'create-product',
    component: CreateProductComponent, canActivate:[AuthGuardComponent]
  },

  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
