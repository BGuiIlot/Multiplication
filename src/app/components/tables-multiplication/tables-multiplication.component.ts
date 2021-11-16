import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tables-multiplication',
  templateUrl: './tables-multiplication.component.html',
  styleUrls: ['./tables-multiplication.component.css']
})
export class TablesMultiplicationComponent implements OnInit {

  @Input() tableau!: number;
  array = Array();

  submitted = false;
  badNombre = false;
  tableForm!: FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.tableForm = new FormGroup({
      tableau: new FormControl(''),

    });
  }

  get formControls() { return this.tableForm.controls; }


  counter(i: number){
    return new Array(i);
  }


  submit2() {
    this.submitted = true;
    this.array = [];
    for (let x = 1; x <= this.tableau; x++) {
      this.array.push(x);
    }
    console.table(this.array);
    if (this.tableForm.value.tableau != '' && this.tableForm.value.tableau != null) {
      this.tableau = this.tableForm.get('tableau')?.value;

    }
    else {
      this.tableau = 10;
      for (let x = 1; x <= this.tableau; x++) {
        for (let y = 1; y <= 10; y++) {
          let multitab = x * y;
          console.log(x + " X " + y +" = " + multitab)
        }
      }
    }
  }
}