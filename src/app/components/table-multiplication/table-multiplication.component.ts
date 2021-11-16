import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-multiplication',
  templateUrl: './table-multiplication.component.html',
  styleUrls: ['./table-multiplication.component.css']
})
export class TableMultiplicationComponent implements OnInit {

  @Input() Nombre!: number;

  isSubmitted = false;
  badNombre = false;


  @Output() leNombre = new EventEmitter<string>();
 

  identForm!: FormGroup;

  constructor() { 
  }

  ngOnInit(): void {
    this.identForm = new FormGroup({
      tableau: new FormControl(''),

      });


  }

  get formControls() { return this.identForm.controls; }


  counter(i: number){
    return new Array(i);
  }
}
