import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  searchControl: FormControl = new FormControl();

  @Input() placerholder : string = "Rechercher un ticket par son nom/prénom de l'auteur, son titre ou son numéro"
  @Output() searchEvent = new EventEmitter<{ searchTerm: string }>();
  isSmallScreen : boolean = false;
  ngOnInit() {
    this.isSmallScreen = window.innerWidth < 992;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isSmallScreen = window.innerWidth < 992;
  }
search() {
    const searchTerm: string = this.searchControl.value;
    this.searchEvent.emit({ searchTerm });
  }
}
