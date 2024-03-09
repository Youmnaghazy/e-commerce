import { CartsComponent } from './components/carts/carts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: RegisterComponent, title: 'Register' },
      { path: 'login', component: LoginComponent, title: 'LogIn' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'Unloggedforgotpass',
        loadComponent: () =>
          import('./components/forgotpass/forgotpass.component').then(
            (c) => c.ForgotpassComponent
          ),
          title:'Forgot Password'
      },
    ],
  },

  {
    path: '',
    component: BlankComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'productdetails/:id',
        component: ProductDetailsComponent,
        title: 'Product Details',
      },
      { path: 'carts', component: CartsComponent, title: 'Carts' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('./components/payment/payment.component').then(
            (c) => c.PaymentComponent
          ),
          title:'Payment'
      },
      {
        path: 'Loggedforgotpass',
        loadComponent: () =>
          import('./components/forgotpass/forgotpass.component').then(
            (c) => c.ForgotpassComponent
          ),
          title:'Forgot Password'
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
          title:'All Orders'
      },
      {
        path: 'categoryDetails/:id',
        loadComponent: () =>
          import('./components/category-details/category-details.component').then(
            (c) => c.CategoryDetailsComponent
          ),
          title:'Category Details'
      },
      {
        path: 'whishlist',
        loadComponent: () =>
          import('./components/whishlist/whishlist.component').then(
            (c) => c.WhishlistComponent
          ),
          title:'WhishList'
      },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'}),
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
