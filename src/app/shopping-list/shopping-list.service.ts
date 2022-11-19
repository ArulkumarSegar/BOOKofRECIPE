import {Subject} from 'rxjs'
import { ingredientsModel } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientChanged = new Subject<ingredientsModel[]>();
    startedEditing = new Subject<number>();
  
    ingredients:ingredientsModel[]=[
        new ingredientsModel('apple',5),
        new ingredientsModel('tomato',4)
      ];

    getIngredient(){
        return this.ingredients.slice();
    }
    getIngrediets(index:number){
        return this.ingredients[index];
    }
    addIngredient(ingre:ingredientsModel){
        this.ingredients.push(ingre)
        this.ingredientChanged.next(this.ingredients.slice())
    }
 addingredients(ingred:ingredientsModel[]){
    // for(let ingr of ingred){
    //     this.addIngredient(ingr)
    // }
    this.ingredients.push(...ingred);
    this.ingredientChanged.next(this.ingredients.slice())
 }
 updateIngredient(index:number,newIng:ingredientsModel){
    this.ingredients[index] = newIng;
    this.ingredientChanged.next(this.ingredients.slice())
 }   
 deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice())
 }
}