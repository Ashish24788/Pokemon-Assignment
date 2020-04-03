import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './shared/header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuardComponent } from "./services/auth.service";
import { ProductDetailAuthGuardComponent } from "./services/product-detail-auth-guard.service";
import { ProductListGuard } from "./services/product-list-guard";
import { UserService } from "./core/user.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductDetailComponent,
    PokemonListComponent,
    CreateProductComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardComponent, ProductDetailAuthGuardComponent, UserService, ProductListGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
