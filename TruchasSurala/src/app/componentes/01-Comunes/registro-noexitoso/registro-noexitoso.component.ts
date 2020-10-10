import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-noexitoso',
  templateUrl: './registro-noexitoso.component.html',
  styleUrls: ['./registro-noexitoso.component.css']
})
export class RegistroNoexitosoComponent implements OnInit {

  @Input() Titulo : string;
  @Input() mensaje : string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  close() {
    this.activeModal.close("OK")
  }
}
