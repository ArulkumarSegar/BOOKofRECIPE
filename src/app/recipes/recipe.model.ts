import { FormArray } from "@angular/forms";
import { ingredientsModel } from "../shared/ingredient.model";

export class RecipeModel{
    public name:string;
    public description:string;
    public imagePath:string;
    public ing:ingredientsModel[];
    // public ing  new FormArray([]);

    constructor(name:string,desc:string,imagePath:string,ingredient:ingredientsModel[]){
        this.name = name;
        this.description =desc;
        this.imagePath = imagePath;
        this.ing = ingredient;
    }
}