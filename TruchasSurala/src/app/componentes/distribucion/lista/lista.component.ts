import { Component, OnInit, Input } from '@angular/core';
import { Distribucion } from '../../../models/distribucion';
import { UserService } from '../../../service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @Input() distribuciones: Distribucion[] = [];
  constructor(

   ) { }

  ngOnInit(): void {


  }

}
