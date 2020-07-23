import { Component, OnInit } from '@angular/core';
import { Componente } from '../../../models/menu';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menuusuario',
  templateUrl: './menuusuario.component.html',
  styleUrls: ['./menuusuario.component.scss'],
})
export class MenuusuarioComponent implements OnInit {

  componentes: Observable<Componente[]>;
  constructor() { }

  ngOnInit() {}

}
