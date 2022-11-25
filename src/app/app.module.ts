import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { dropdowndirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { appRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipes.service';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeModule } from './recipes/recipe.module';
import { ShoppingListModule } from './shopping-list/shoppingList.module';
import { SharedModule } from './shared/shared.Module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    appRoutingModule,
    SharedModule,
    CoreModule,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
