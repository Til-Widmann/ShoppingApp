import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
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

  @Output()
  addEvent = new EventEmitter<Ingredient>();

  addClicked(){
    this.addEvent.emit({
      name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value
    })
  }
  deleteClicked(){

  }
  clearClicked(){

  }
}
