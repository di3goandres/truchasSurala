import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deseas-continuar',
  templateUrl: './deseas-continuar.component.html',
  styleUrls: ['./deseas-continuar.component.css']
})
export class DeseasContinuarComponent implements OnInit {
  @Input() Titulo: string;
  @Input() mensaje: string;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  close() {
    this.activeModal.close("OK")
  }
  closeNOOK() {
    this.activeModal.dismiss();
  }

}
