import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroExitosoComponent } from '../../01-Comunes/registro-exitoso/registro-exitoso.component';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DespachoService } from '../../../service/despacho/despacho.service';
import { Despacho } from 'src/app/models/despacho.response';
import { DespachoLlegada } from '../../../models/despacho.response';
import { MatAccordion } from '@angular/material/expansion';
import { SaveFile } from '../../../models/pedidos/guardar.pdf.response';

@Component({
  selector: 'app-modalregistrollegada',
  templateUrl: './modalregistrollegada.component.html',
  styleUrls: ['./modalregistrollegada.component.css']
})
export class ModalregistrollegadaComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  contentInclude = "image/jpeg, image/png";
  fileToUpload: File = null;
  savefile: SaveFile = new SaveFile();
  savefiles: SaveFile[] = []



  dias: any[] = ['A tiempo', '1', '2', 'No se despacharon']
  firstFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;
  @Input() despacho: Despacho;
  despachoupdate: DespachoLlegada;

  myDateValue: Date;
  previousDate: Date;
  agregar: boolean;
  status: string;
  title: string;
  constructor(
    private despachoService: DespachoService,
    public datepipe: DatePipe,
    private activeModal: NgbActiveModal,

    private modalService: NgbModal,
    private _formBuilder: FormBuilder) {
    this.title = 'Actualización Despacho';
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 8);
    this.maxDate.setDate(this.maxDate.getDate() + 8);
    this.myDateValue = new Date();

  }

  ngOnInit(): void {
    this.despachoupdate = new DespachoLlegada()
    this.despachoupdate.id = this.despacho.id;



    this.firstFormGroup = this._formBuilder.group({

      EstadoLlegada: ['', Validators.required],
      dias: ['', Validators.required],
      Temperatura: ['', Validators.required],
      Observaciones: ['', Validators.required],

    });

    this.agregar = false;
  }



  onRegister(): void {


    this.despachoupdate.fotos = [];
    this.despachoupdate.fotos.push(...this.savefiles);
    console.log(this.despachoupdate)
    this.despachoService.registrarLlegada(this.despachoupdate).subscribe(
      response => {
        console.log(response);
        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
         
          this.openExitoso();
          this.activeModal.close("OK");

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);

        this.status = 'error';
      
      }

    );
  }

  removerImagen(item: SaveFile){
    const index: number = this.savefiles.indexOf(item);
    if (index !== -1) {
        this.savefiles.splice(index, 1);
    }    
  }
  onDateChange(newDate: Date): void {
    this.previousDate = new Date(newDate);


  }

  onClickMostrar() {
    this.agregar = !this.agregar;
  }

  cerrar() {
    this.modalService.dismissAll();
  }
  openExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }
  handleFileInput(files: FileList) {

   
    if (this.contentInclude.includes(files.item(0).type)) {
      this.fileToUpload = files.item(0);
     
    }
    this.savefile = new SaveFile();
    this.savefile.id = this.despacho.id.toString()
    this.savefile.nombre = this.fileToUpload.name;
    this.savefile.type = this.fileToUpload.type;



    const file = this.fileToUpload;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {

      this.savefile.file = reader.result;
      this.savefiles.push(this.savefile);


    };

    console.log( this.savefiles)

  }

}
