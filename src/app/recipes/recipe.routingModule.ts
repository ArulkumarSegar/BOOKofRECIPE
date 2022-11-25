import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { ResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";
const routes:Routes =[
    {path:'',component:RecipesComponent,
     canActivate:[AuthGuard],
     children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent,resolve:[ResolverService]},
        {path:':id/edit',component:RecipeEditComponent,resolve:[ResolverService]},
    ]},
]
@NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipeRoutingModule{}