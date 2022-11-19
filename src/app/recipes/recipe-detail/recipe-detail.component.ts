import { Component, OnInit} from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { ActivatedRoute ,Params,Router} from '@angular/router';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!:RecipeModel
  id!:number
  
  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }
  ngOnInit() {
  this.route.params.subscribe(
    (params:Params) =>{
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipes(this.id)
    }
  )
  }
  onAddToShoopingList(){
  this.recipeService.addIngredientToShoppingList(this.recipe.ing)
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }
  onDeleteRecipe(){
   this.recipeService.deleteRecipe(this.id) 
   this.router.navigate(['/recipes'])
  }
}
