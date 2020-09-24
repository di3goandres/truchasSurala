import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DistribucionResponse, InfoR, MostrarDistribucionTotal, DistribucionR } from 'src/app/models/distribucion.response';
import { NestedTreeControl } from '@angular/cdk/tree';
import { UserService } from 'src/app/service/user/user.service';
import { DistriService } from '../../../service/distribucion/distri.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DespachoNewResponse, DistribucionNew } from '../../../models/despacho/despachonew.response';

@Component({
  selector: 'app-distribuciongloballist',
  templateUrl: './distribuciongloballist.component.html',
  styleUrls: ['./distribuciongloballist.component.css']
})
export class DistribuciongloballistComponent implements OnInit {


  data: DespachoNewResponse;
  distribuciones: DistribucionNew[] =[];
  mostrar: InfoR[] = []
  distribuciontotal: MostrarDistribucionTotal[] = []
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  displayedColumns: string[] = ['position', 'Nombre', 'finca','Cantidad','CantidadTraza','caja',  'bandeja', 'cantidadBandeja','ovas_ml'];
  treeControl = new NestedTreeControl<InfoR>(node => node.childrend);
  dataSource = new MatTableDataSource<DistribucionNew>();
  //InfoR[] = []

  @Input() idDespacho: number;
  constructor(
    private distriService: DistriService
  ) { }

  ngOnInit(): void {


    this.obtenerListaDistribucion();

  }


  private obtenerListaDistribucion() {
    this.distriService.distribucionDespachoNew(this.idDespacho).subscribe(
      response => {


        console.log('En lista', response);

        
        this.distribuciones = response.distribucion
        this.dataSource = new MatTableDataSource(this.distribuciones)
        this.dataSource.paginator = this.paginator;
       
        // }



      },
      error => { });
  }


}
