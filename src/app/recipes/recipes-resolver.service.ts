import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeModel } from "./recipe.model";
import { RecipeService } from "./recipes.service";

@Injectable({providedIn:'root'})
export class ResolverService implements Resolve<RecipeModel[]>{
    
    constructor(private dataStorageService:DataStorageService,private recipeService:RecipeService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RecipeModel[] | Observable<RecipeModel[]> | Promise<RecipeModel[]> {
     
    const recipe = this.recipeService.getRecipe();
    if(recipe.length === 0){
        return this.dataStorageService.fetchRecipes()
    }
    else{
        return recipe;
    }
    }
}