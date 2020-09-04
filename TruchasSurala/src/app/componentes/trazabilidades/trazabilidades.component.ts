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
  id: string;
  constructor(

    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.mostrar=false;
    this.distribucion = [];
    this.userService.getTrazabilidad(this.id ).subscribe(
      response => {

        
          if(response.status=="success"){
            this.traza= response;
            this.distribucion = this.traza.distribucion;
        

          }
      
      },
      error => {
        console.log(error)

      }
    )
  }

}
