import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../service/pedidos/pedidos.service';

@Component({
  selector: 'app-asociarfactura',
  templateUrl: './asociarfactura.component.html',
  styleUrls: ['./asociarfactura.component.css']
})
export class AsociarfacturaComponent implements OnInit {

  contentInclude = "application/pdf";
  fileToUpload: File = null;
  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {
  }
  handleFileInput(files: FileList) {

    if (this.contentInclude.includes(files.item(0).type)) {
      this.fileToUpload = files.item(0);
    } 

  
  }

  guardarArchivo(id){
    this.pedidosService.postFile(this.fileToUpload, "0")
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
