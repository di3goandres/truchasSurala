import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { Pedido } from '../../models/pedidos';
import { EliminarPedido } from '../../models/pedidos/delete.pedidos.request';
import { Respuesta } from '../../models/pedidos/guardar.factura.response';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PedidosService {

  constructor(
    public http: HttpClient,
    private userService: UserService
  ) { }

  updatePedido(data: Pedido): Observable<any> {
    let json = JSON.stringify(data);
    let params = 'json=' + json;
    return this.userService.ejecutarQueryPost('/api/pedidos/actualizarpedido', params);
  }

  borrarTrazabilidad(id): Observable<any> {
    let eliminar = new EliminarPedido();
    eliminar.id = id;
    eliminar.borrarPedido = false;

    let json = JSON.stringify("eliminar");
    let params = 'json=' + json;
    console.log(params)

    return this.userService.ejecutarQueryDelete('/api/pedidos/eliminarpedido/' + id + '/false', '');
  }

  borrarTrazabilidadyPedido(id): Observable<any> {
    let eliminar = new EliminarPedido();
    eliminar.id = id;
    eliminar.borrarPedido = true;

    let json = JSON.stringify("eliminar");
    let params = 'json=' + json;
    console.log(params)
    return this.userService.ejecutarQueryDelete('/api/pedidos/eliminarpedido/' + id + '/true', '');
  }

  postFile(fileToUpload: File, id: string): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', fileToUpload, fileToUpload.name)

    formData.append('idPedido', id.toString());



  
    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:4200/api/pedido/uploadpdf/');
    request.send(formData);
    // return this.userService.ejecutarQueryPostArchivo('/api/pedido/uploadpdf/',
    //   formData);

  }

}
