import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './shared/header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuardComponent } from './services/auth.service';
import { ProductDetailGuard } from './services/product-detail-guard.service';
import { ProductListGuard } from './services/product-list-guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './services/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    PokemonDetailComponent,
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
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuardComponent,
    ProductDetailGuard,
    ProductListGuard,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
