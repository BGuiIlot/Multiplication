# 					**TP Multiplications** 

## **Objectif**

Ce projet a été réalisée du 15/11/2021 au 16/11/2021, le but était de crée une application web qui affiche une table de multiplication (1 à 10 par défaut) selon une valeur donnée par l'utilisateur. Ainsi que toutes les tables entre 1 et la valeur donnée par l'utilisateur.

## **Prérequis**

- Environnement de travail opérationnel
- Savoir créer un projet Angular avec des composants.
- Avoir compris les modes d’échanges entre Parent et Enfant d’élément du DOM
  Voir : https://angular.io/guide/inputs-outputs
- Avoir une bonne connaissance de base des langage de programmation (Angular,Javascript,Typescript)

## **Lien GitHub**



https://github.com/BGuiIlot/Multiplication



## **Partie 1**

Dans un premier temp j'ai crée un composant ``table-multiplication`` grâce à la commande : ``ng generate component components/table-multiplication`` (raccourci de la commande: ``ng g c components/table-multiplication``).

Voici la mono-page de l'application web ou l'on trouve donc le premier formulaire qui nous demande un nombre.

![Formulaire partie 1](https://user-images.githubusercontent.com/77786971/142035881-5d5b3abf-f4d5-4d10-bfe6-33055f659eef.PNG)

Code HTML du formulaire: **app.component.html**

```html
// app.component.html

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">
    </a>
  </div>
  <div id="navbarBasic" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">Accueil</a>
    </div>
  </div>
</nav>
<section class="section">
  <div class="container">
    <div class="column">
      <h1 class="title is-1">Projet Multiplication</h1>
    </div>
  </div>
  <h3 class="title is-3">La table du Nombre que vous souhaitez</h3>
  <form [formGroup]="tableForm" (ngSubmit)="submit()">(1)
    <div class="field">
      <label class="label">Choisissez un nombre</label>
      <div class="control">
        <input class="input is-success" formControlName="Nombre" type="number" placeholder="Nombre" value="">
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Valider</button>
      </div>
    </div>
  </form>

  <div *ngIf="isSubmitted">(3)
    <app-table-multiplication [Nombre]="Nombre"></app-table-multiplication>(2)
  </div>
  <app-tables-multiplication></app-tables-multiplication>(4)


</section>
<footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
      <p>
        Template réalisé à partir du framework CSS <a href="https://bulma.io">Bulma</a>
      </p>
    </div>
  </div>
</footer>

```

Premièrement sur la ligne indiquée avec le numéro (1) on appelle le formulaire ``"tableform"`` et ensuite on associe à cela la méthode ``submit()`` que nous verrons ci-dessous, Ensuite nous appelons dans la ligne numérotée (2) dans ``<app-table-multiplication [Nombre]="Nombre"></app-table-multiplication>`` le ``[Nombre]`` qui vient du component enfant et la source ``"Nombre"`` qui est une propriété du parent que nous verrons aussi ci-dessous dans le fichier ``app.components.ts`` . Et la condition ``*ngIf="isSubmitted"``(3)  elle permet si elle est initialisé à `true` d’afficher le contenu de la `<div>`. et les ligne numéro (4) et (2) permettent d'appeler les version html des enfant, c'est une sorte de "hiérarchie".



#### **app.component.ts**

```tsx
//app.component.ts

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Nombre = 0; (1)
  title = 'Multiplication';
  
  tableForm!: FormGroup;(2)
  isSubmitted = false;(3)

  constructor() { }

  ngOnInit(): void {
    this.tableForm = new FormGroup({
      Nombre: new FormControl(''),
      });
    
    
  }

  get formControls() { return this.tableForm.controls; }

  submit() { (4)
    this.isSubmitted = true;(5)
    this.Nombre = this.tableForm.get('Nombre')?.value;(6)
    console.log(this.Nombre);
    if(this.tableForm.value.Nombre != '' && this.tableForm.value.Nombre != null){(7)
    this.Nombre = this.tableForm.get('Nombre')?.value;
    }
    else{
        this.Nombre = 1;
    }
  }
}

```

1. On initialise la variable ``Nombre`` à ``0``.
2. On voit la déclaration de tableForm.
3. On initialise la variable booléen ``isSubmitted`` à ``false``.
4. Si on clique sur ``Valider`` dans le formulaire la méthode  ``submit()`` s'execute.
5. La variable ``isSubmitted`` passe à ``true``.
6. ``Nombre`` prends la valeur entré dans le formulaire par l'utilisateur.
7. La condition ``if`` permet que si rien est entré dans le formulaire par l'utilisateur ou si c'est nul après validation il le remplace par 1.



#### **table-multiplication.component.html**

Voici le code du fichier ``table-multiplication.component.html`` qui affiche la table de multiplication souhaité :

```html
//table-multiplication.component.html

<div class="card has-text-centered ">
    <header class="card-header ">
        <p class="card-header-title ">
            Table de {{Nombre}}
        </p>

    </header>
    <div class="card-content">
        <div class="">
            <ul>

                <li *ngFor="let number of counter(11) ;let i = index">
                    {{ Nombre }} X {{i }} = {{ Nombre*i }}
                </li>
            </ul>
        </div>
    </div>

</div>
```

Le plus intéressant et important dans ce code est la boucle ``*ngFor`` qui vas parcourir le tableau de la méthode ``counter()`` qui est composé de 10 éléments ``i`` de 1 à 10 qui sont les coefficient de multiplication d'une table. On utilise la variable ``Nombre`` récupéré du composant parent `app.component.html` et les valeurs des coefficients grâce à la boucle qui parcours le tableau de la méthode.

#### **table-multiplication.component.ts**

```tsx
// table-multiplication.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-multiplication',
  templateUrl: './table-multiplication.component.html',
  styleUrls: ['./table-multiplication.component.css']
})
export class TableMultiplicationComponent implements OnInit {

  @Input() Nombre!: number; (1)


  @Output() leNombre = new EventEmitter<string>();
 

  tableForm!: FormGroup;

  constructor() { 
  }

  ngOnInit(): void {
    this.tableForm = new FormGroup({
      tableau: new FormControl(''),

      });


  }

  get formControls() { return this.tableForm.controls; }


  counter(i: number){ (2)
    return new Array(i);
  }
}

```

la ligne (1)  permet au component enfant de recevoir les données de ses parent ici c'est ``Nombre``.

la ligne (2) est la méthode ``counter()`` qui permet de crée le tableau d'éléments.



Cette ensemble permet de donnée ce résultat sur la mono-page web:

![Capture web](https://user-images.githubusercontent.com/77786971/142067538-35a3dd3f-3518-40bf-8b94-90dfbad85332.PNG)



## **Partie 2**

je réitère l'opération et crée un composant ``tables-multiplication`` grâce à la commande : ``ng generate component components/tables-multiplication`` (raccourci de la commande: ``ng g c components/tables-multiplication``).



Deuxième formulaire web:

![Capture web 2](https://user-images.githubusercontent.com/77786971/142068108-a001a6d1-be1b-4644-aff0-6e3343cb2e47.PNG)

#### **tables-multiplication.component.html**

```html
//tables-multiplication.component.html

<section class="section">
    <div class="container">
    <div class="column">

    <section class="section">
      <div class="container">
          <div class="columns is-centered">
              <div class="column is-half">
                  <h3 class="title is-3">Les tables de Multiplications souhaité</h3>
                  <form  [formGroup]="tableForm" (ngSubmit)="submit2()">
                    <div class="field">
                        <label class="label">Choisissez un nombre</label>
                        <div class="control">
                            <input class="input is-success" formControlName="tableau" type="number" placeholder="Nombre" value="">
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link">Valider</button>
                        </div>
                    </div>
                </form>
              </div>
          </div>
      </div>
    </section>
    </div>
    </div>
</section>



<div *ngIf="submitted">
        <ul *ngFor="let x of array">
                <li *ngFor="let number of counter(11) ;let i = index">{{ array[x-1] }} X {{ i }}  = {{ i * array[x-1] }} </li>
                <li> ------------------ </li>
    </ul>
</div>




```

Un formulaire similaire à l’exception que la valeur donné par l’utilisateur est appelé `tableau` et non `Nombre` par les composants.

La condition `*ngIf="submitted"` fonctionne de la même manière que `isSubmitted` de la partie 1 mais son nom est différent.

La fonction associé à notre formulaire est `submit2()`.

La première boucle ``*ngFor`` dans la balise ``<ul>`` permet de créer les tables de multiplications de la valeurs choisit par les utilisateurs.

Ensuite la seconde boucle dans la balise ``<li>`` permet d'effectuer les calculs des différentes tables.



#### **tables-multiplication.component.ts**

```tsx
//tables-multiplication.component.ts

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
```

1. On définit la propriété d'entré `tableau` avec un `@Input` sans oublier d'importer les packages.
2. on retrouve la même méthode ``counter()``.
3. La fonction `submit2()` passe à `true` `submitted` ce qui permettra d'afficher les tables sur la page.
4. Le tableau `array` est initialisé vide pour que chaque validation le réinitialise.
5. La boucle `for` rempli le tableau de la valeur 1 à la valeur `tableau` ajouter par l'utilisateur.
6. Enfin la condition `if` permet de donner comme valeur par défaut 10 à `tableau` si après validation le formulaire est vide ou la valeur rentré est null.



Résultat de la mono-page Web du deuxième formulaire:

![Capture web 3](https://user-images.githubusercontent.com/77786971/142071129-7fdd5c79-1858-4a72-8abd-6cc712cc5b61.PNG)



## **Diagramme de classes ULM**

<img src="https://user-images.githubusercontent.com/77786971/142074799-494f8fcc-3a24-4d03-a817-acc9e329a099.PNG" alt="Diagramme de classes ULM"  />



## **Conclusion**

J'ai trouvée ce projet très abordable et grâce à lui cela m'a permis de prendre des connaissances sur le Framework angular qui est du front-end et m'as donnée envie de m'y intéressée. J'ai eu quelque difficultés pour la fin du projet mais je l'ai néanmoins terminé, même si j'aurais voulu peaufiné quelque détail comme le faite que les deux boucle ``*ngfor`` étant imbriqué l'une dans l'autre nous devons validés deux fois le formulaire. Mais à par ceci le projet me satisfait toute les fonctions demandés fonctionne et sont respectés.











