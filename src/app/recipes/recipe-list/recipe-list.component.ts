import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { Router,ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy{
    subscription!:Subscription;
   recipes!:RecipeModel[];
  constructor(private recipeService:RecipeService,
      private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
   this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipe:RecipeModel[]) => {
        this.recipes = recipe
      }
    )
  this.recipes = this.recipeService.getRecipe()
  }
  onNewRecipe(){
  this.router.navigate(['new'],{relativeTo:this.route})
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
