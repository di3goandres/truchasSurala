import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../service/pedidos/pedidos.service';
import { SaveFile } from '../../../models/pedidos/guardar.pdf.response';

@Component({
  selector: 'app-asociarfactura',
  templateUrl: './asociarfactura.component.html',
  styleUrls: ['./asociarfactura.component.css']
})
export class AsociarfacturaComponent implements OnInit {
  savefile : SaveFile = new SaveFile();
  contentInclude = "application/pdf";
  fileToUpload: File = null;
  constructor(private pedidosService: PedidosService) { }

  
  ngOnInit(): void {
  }
  handleFileInput(files: FileList) {

    if (this.contentInclude.includes(files.item(0).type)) {
      this.fileToUpload = files.item(0);
    } 
    this.savefile = new SaveFile();
    this.savefile.id = "4";
    this.savefile.nombre =  this.fileToUpload.name;
    this.savefile.type =  this.fileToUpload.type;

 

    const file = this.fileToUpload;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       
        this.savefile.file = reader.result;
    };
  
  }

  guardarArchivo(id){
   
   
    this.pedidosService.postFile(this.savefile, "4")
    .subscribe(
      response => {
       console.log(response);
      
      },
      error => {
        console.log(error)
      
      },

    )
  }
}
