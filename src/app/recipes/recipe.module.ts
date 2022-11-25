import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.Module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRoutingModule } from "./recipe.routingModule";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipesComponent,
        RecipeItemComponent,
        RecipeEditComponent,
    ],
    imports:[
        RouterModule,
        ReactiveFormsModule,
        RecipeRoutingModule,
        SharedModule
    ],
})
export class RecipeModule{}