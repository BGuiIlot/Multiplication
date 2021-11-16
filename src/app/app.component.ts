import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TableMultiplicationComponent } from './components/table-multiplication/table-multiplication.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Nombre = 0;
  title = 'Multiplication';
  
  identForm!: FormGroup;
  isSubmitted = false;
  badNombre = false;

  constructor() { }

  ngOnInit(): void {
    this.identForm = new FormGroup({
      Nombre: new FormControl(''),
      });
    
    
  }

  get formControls() { return this.identForm.controls; }

  submit() {
    this.isSubmitted = true;
    this.Nombre = this.identForm.get('Nombre')?.value;
    console.log(this.Nombre);
    if(this.identForm.value.Nombre != '' && this.identForm.value.Nombre != null){
    this.Nombre = this.identForm.get('Nombre')?.value;
    }
    else{
        this.Nombre = 1;
    }
  }
}
