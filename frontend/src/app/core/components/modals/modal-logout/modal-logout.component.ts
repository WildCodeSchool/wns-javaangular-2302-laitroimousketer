import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss']
})
export class ModalLogoutComponent implements OnInit {
  modalLogout: BsModalRef = new BsModalRef();
  icon = faCircleXmark;
  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.modalLogout = this.bsModalRef;
  }

  hide(): void {
    this.modalLogout.hide();
  }
}
