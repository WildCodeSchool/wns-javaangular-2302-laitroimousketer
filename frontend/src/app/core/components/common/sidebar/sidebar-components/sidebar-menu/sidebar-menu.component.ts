import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MenuItems } from './menu-items.model';
import { Store } from '@ngrx/store';
import * as sidebarReducer from 'src/app/store/reducers/index';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  @Output() page: EventEmitter<string> = new EventEmitter<string>();
  @Input() menuItems: MenuItems[] = [];
  @Input() menuTitle: string = '';
  @Input() menuIcon: string = '';

  @Output() position = new EventEmitter();
  positionNav: number = 0;
  @ViewChild('activeBloc') activeBloc!: ElementRef;
  @ViewChildren('blockMenu') blockMenu!: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    private store: Store<sidebarReducer.StateDataStore>,
  ) {}

  ngOnInit() {
    this.setBar(this.positionNav);
  }

  ngAfterViewChecked(): void {
    this.changeBlock(this.positionNav)
  }

  onMenuItemClick(menuItem: MenuItems, index: number): void {
    // console.log('click', menuItem.page);
    this.page.emit(menuItem.page);
  }

  setBar(position: number) {
    this.positionNav = position;
    this.onMenuItemClick(this.menuItems[position], position);
    this.changeBlock(position);
    this.position.emit(position);
  }

  changeBlock(position: number) {
    if (this.blockMenu) {
      const top = this.blockMenu.toArray()[position].nativeElement.getBoundingClientRect().top;
      this.renderer.setStyle(this.activeBloc.nativeElement, 'transform', `translateY(${top}px)`);
    }
  }
  closeSidebar() {
    this.store.dispatch(sidebarAction.resetSideBar());
  }
  
}
