import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ingredientsModel } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeModel } from "./recipe.model";
@Injectable()
export class RecipeService{

    recipesChanged = new Subject<RecipeModel[]>();
    // recipeSelected = new EventEmitter<RecipeModel>()

//    private recipes:RecipeModel[] = [
    
//         new RecipeModel('mutton briyani','this is very spaicy and tasty','https://st2.depositphotos.com/1954867/5270/i/950/depositphotos_52707919-stock-photo-tandoori-chicken-and-chicken-biryani.jpg',[
//             new ingredientsModel('meat',1)

//         ]),
//         new RecipeModel('mutton briyani','this is prepared by organic ingredients','https://img-global.cpcdn.com/recipes/c6ab1c63858c24b3/1200x630cq70/photo.jpg',[
//             new ingredientsModel('chicken',1)
//         ]),
//       ];
private recipes:RecipeModel[] = []
    constructor(private slService:ShoppingListService){}

    setRecipes(recipes:RecipeModel[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }
getRecipe(){
    return this.recipes.slice();
}
getRecipes(index:number){
    return this.recipes[index]
}
addIngredientToShoppingList(ing:ingredientsModel[]){
    this.slService.addingredients(ing)
}

addRecipe(recipe:RecipeModel){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
}
updateRecipe(index:number,newRecipe:RecipeModel){
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1)
        this.recipesChanged.next(this.recipes.slice())
    }


}