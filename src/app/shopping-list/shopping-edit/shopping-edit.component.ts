import {Component, ElementRef, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput')
  nameInput: ElementRef

  @ViewChild('amountInput')
  amountInput: ElementRef

  constructor(private shoppingListService: ShoppingListService) {
  }

  addClicked(){
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.shoppingListService.onAddEvent(ingredient)
  }
  deleteClicked(){

  }
  clearClicked(){

  }
}
