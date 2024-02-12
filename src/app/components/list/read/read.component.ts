import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/item.model';
import { ListService } from '../../service/list.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable } from 'rxjs/internal/Observable';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';


interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  type: string;
  action: string;
  description: string;
}

const ELEMENT_DATA: Product[] = [
  {id: 1, name: 'Hydrogen', quantity: 1, price: 1.0079, type: 'Gas', action: 'Buy', description: 'Description 1'},
  {id: 2, name: 'Helium', quantity: 1, price: 4.0026, type: 'Gas', action: 'Buy', description: 'Description 2'},
  {id: 3, name: 'Lithium', quantity: 1, price: 6.941, type: 'Metal', action: 'Buy', description: 'Description 3'},
  {id: 4, name: 'Beryllium', quantity: 1, price: 9.0122, type: 'Metal', action: 'Buy', description: 'Description 4'},
  {id: 5, name: 'Boron', quantity: 1, price: 10.811, type: 'Non-metal', action: 'Buy', description: 'Description 5'},
  {id: 6, name: 'Carbon', quantity: 1, price: 12.0107, type: 'Non-metal', action: 'Buy', description: 'Description 6'},
  {id: 7, name: 'Nitrogen', quantity: 1, price: 14.0067, type: 'Non-metal', action: 'Buy', description: 'Description 7'},
  {id: 8, name: 'Oxygen', quantity: 1, price: 15.9994, type: 'Non-metal', action: 'Buy', description: 'Description 8'},
  {id: 9, name: 'Fluorine', quantity: 1, price: 18.9984, type: 'Non-metal', action: 'Buy', description: 'Description 9'},
  {id: 10, name: 'Neon', quantity: 1, price: 20.1797, type: 'Gas', action: 'Buy', description: 'Description 10'},
];

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss',
  providers: [HttpClient, ListService]
})
export class ReadComponent implements OnInit{
  
  items: Item[] = [];
  error: any;
  dataSource = new MatTableDataSource(this.items);
  createForm: FormGroup;
  id_table:number | undefined;

  constructor(private listService: ListService, private snackBar: MatSnackBar, private formBuilder: FormBuilder,private router: Router) {
    this.createForm = this.formBuilder.group({
          name: ['', Validators.required],
          quantity: [0, Validators.required],
          price: [0, Validators.required],
          type: ['', Validators.required],
          description: ['']
        });
  }

  ngOnInit(): void {
    this.getAllItens();
  }
  displayedColumns: string[] = [ 'position','name', 'quantity', 'price', 'type', 'description', 'action'];

  private getAllItens() {
    this.listService.read().subscribe(itens => {
      this.dataSource.data = itens;
      console.log(this.dataSource.data);
    });
  }

  deleteItem(id: any): void {
    this.listService.deleteById(id)
      .subscribe(
        (response) => {
          this.getAllItens();
          console.log('Item deleted successfully:', response);
        },
        error => {
          console.error('Error deleting item:', error);
        }
      );
  }

  navigateToUpdate(id: number): void {
    this.router.navigate(['item/update/', id]);
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const newItem = {
        name: this.createForm.value.name,
        quantity: this.createForm.value.quantity,
        price: this.createForm.value.price,
        type: this.createForm.value.type,
        description: this.createForm.value.description
      };

      this.listService.create(newItem).subscribe(
        response => {
          console.log('Item created successfully:', response);
          this.getAllItens();
        },
        error => {
          console.error('Error creating item:', error);
        }
      );
    } else {
      console.error('Error creating item');
    }
  }
}

