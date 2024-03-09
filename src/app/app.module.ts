import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartsComponent } from './components/carts/carts.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ToastrModule } from 'ngx-toastr';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { SearchPipe } from './pipes/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartsComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    NavAuthComponent,
    NavBlankComponent,
    NotfoundComponent,
    AuthComponent,
    BlankComponent,
    CategorySliderComponent,
    MainSliderComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      closeButton:true,
      tapToDismiss:true
    }),
    NgxSpinnerModule,
    SearchPipe,
    FormsModule,

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:HeadersInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
