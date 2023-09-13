import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  searchControl!: FormControl;

  placerholder : string = 'Rechercher un ticket par son numéro, nom, auteur...'
  ngOnInit() {
  }

search() {
  // TODO:
    console.log('search');
  }
}
