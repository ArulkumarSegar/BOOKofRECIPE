import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute ,Params, Router} from '@angular/router';
import { ingredientsModel } from 'src/app/shared/ingredient.model';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!:number;
  editMode = false
  recipeForm!:FormGroup;
  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }
fg!:FormArray;
  ngOnInit(){
    this.route.params
    .subscribe(
      (params:Params) =>{
        this.id = +params['id']
        this.editMode = params['id'] != null;
        this.initForm()
      }
      )
    }
    onSubmit(){
      const NewRecipe = new RecipeModel(
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients'],
      )
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,NewRecipe)
    }  else{
      this.recipeService.addRecipe(NewRecipe)
    }
    this.onCancel()
    }
    onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup(
      {
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      }
    ))
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onDeleteIng(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
    
    private initForm(){
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription ='';
      let recipeIngredients:any = new FormArray([])
    if(this.editMode){
      const recipe = this.recipeService.getRecipes(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription=recipe.description;
     if(recipe['ing']){
      for(let ing of recipe.ing){
            recipeIngredients.push(new FormGroup({
              'name':new FormControl(ing.name,Validators.required),
              'amount':new FormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));  
      }
     }
     }
    
    this.recipeForm = new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }
  get formArrayIng(){
    return this.recipeForm.get('ingredients')  as FormArray
  }

}
