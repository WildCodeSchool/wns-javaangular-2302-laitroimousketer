import { Component, HostListener, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  events: string[] = [];
  private sidebarSubscription: Subscription | undefined;
  opened: boolean = false;
  mode = new FormControl('over');

  constructor(
    private sharedService: SharedService,
    private elementRef: ElementRef,
    ) { }
  
    ngOnInit() {
      this.sidebarSubscription = this.sharedService.sidebarOpened$.subscribe(opened => {
        this.opened = opened;
        console.log('this.opened', this.opened);
      })
    }
    @ViewChild('sidenav') sidenav!: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

   toggle(): void {
    this.sharedService.toggleSidebar();
   }
  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: Event): void {
  //   if (this.opened && !this.elementRef.nativeElement.contains(event.target)) {
  //     this.opened = false;
  //   }
  // }
}
