import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TopTrazabilidad, DistribucionTrazabilidad } from '../../models/Trazabilidad';

@Component({
  selector: 'app-trazabilidades',
  templateUrl: './trazabilidades.component.html',
  styleUrls: ['./trazabilidades.component.css']
})
export class TrazabilidadesComponent implements OnInit {

  traza: TopTrazabilidad;
  distribucion: DistribucionTrazabilidad[];
  mostrar: boolean;
  constructor(

    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.mostrar=false;
    this.distribucion = [];
    this.userService.getTrazabilidad(1).subscribe(
      response => {
          if(response.status=="success"){
            this.traza= response;
            this.distribucion = this.traza.distribucion;
            console.log(this.distribucion);

          }
      
      },
      error => {
        console.log(error)

      }
    )
  }

}
