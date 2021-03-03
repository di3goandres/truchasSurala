
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { Despachosroot, Caja, DespachoRootObject, Despacho } from '../../models/despacho';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgregarcajaComponent } from './agregarcaja/agregarcaja.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BandejascajaComponent } from '../bandejascaja/bandejascaja.component';
import { DespachosComponent } from '../despachos/despachos.component';
import { DespachoService } from '../../service/despacho/despacho.service';
import { RegistroExitosoComponent } from '../01-Comunes/registro-exitoso/registro-exitoso.component';
import { BorrarloteComponent } from '../05-Despacho/borrarlote/borrarlote.component';


const ELEMENT_DATA: Caja[] = []
@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css']
})
export class DespachoComponent implements OnInit {

  habilitarAgregar:boolean = false;
  displayedColumns: string[] = ['position', 'FechaDesove', 
  'LineaGenetica', 'NumLote',
  'EdadTcu', 'Tamaño', 'Ovasml', 
  'NumberoBandejas', 'TotalCaja', 'TotalUsados', 'VerBandejas', 'borrar'];

  
  public despacho: Despachosroot = new Despachosroot();
  public id;
  public actual: Despacho;
  // public dataSource: Caja[] = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public agregar: boolean;
  public closeResult: string;
  constructor(
    private userService: UserService,
    private servicio: DespachoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
  
    this.dataSource.paginator = this.paginator;

    this.consultaInicial();
    
  }
  openExitoso(){
    const modalRef = this.modalService.open(RegistroExitosoComponent,
       {size: 'md'});
  
    modalRef.result.then((result) => {
    
    
    }, (reason) => {
    
    
    });
  }
  
  borrarLoteid(id){
    this.servicio.borrarLote(id).subscribe(
      OK => {
        this.openExitoso()
        this.consultaInicial(this.id);


      },
      ERROR => {console.log(ERROR)},
    )
  }
  borrarLote(id){
    const modalRef = this.modalService.open(BorrarloteComponent, {size: 'mg', windowClass: 'vibrate-2'});
   
    modalRef.result.then((result) => {
      if (result === "BORRAR") {
        this.borrarLoteid(id);
      }else{
      }
      console.log('result', result);
    }, (reason) => {

     
       
      this.servicio.MostrarSnack("Totalmente de acuerdo 😊")


      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
 
      if (reason === 'OK') {
     
       
      }
    });
   

  }
  private consultaInicial(id = null) {
    this.agregar = false;
    if (id == null) {
      this.id = this.route.snapshot.paramMap.get('id');

    } else {
      this.id = id;
    }
    // console.log('id2:', this.route.snapshot.paramMap.get('id'));
    this.servicio.getDespacho(this.id).subscribe(resp => {
 
      if (resp.status !== 'error') {

        
        this.dataSource =  new MatTableDataSource( resp.cajas)
        this.dataSource.paginator = this.paginator;

        this.despacho = resp;
        

        this.habilitarAgregar = resp.despacho.Activo === 1 ? false: true;
        return;
      }
      this.despacho = resp;



    });

  }

  crearCaja(): void {
    this.agregar = !this.agregar;
    console.log(this.agregar);
    // this.router.navigate(['surala/despacho/caja/create/', this.id]);
  }

  openBandejas(id){

    const modalRef = this.modalService.open(BandejascajaComponent, {size: 'lg', windowClass: 'bounce-top' });
    modalRef.componentInstance.idConsulta = id
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('result', result);
    }, (reason) => {




      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
 
      if (reason === 'OK') {
     
       
      }
    });

  }

  open(): void {
    const modalRef = this.modalService.open(AgregarcajaComponent , 
       {size: 'lg',
        windowClass: 'bounce-top' 
      });
    modalRef.componentInstance.idDespacho = this.id;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('result', result);
    }, (reason) => {




      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
 
      if (reason === 'OK') {
     
        this.consultaInicial(this.id);
      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
