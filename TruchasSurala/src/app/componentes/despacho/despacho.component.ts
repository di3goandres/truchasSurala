
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { Despachosroot, Caja} from '../../models/despacho';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css']
})
export class DespachoComponent implements OnInit {

  public despacho: Despachosroot;
  public id;
  public cajas: Caja[] = [];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    // console.log('id2:', this.route.snapshot.paramMap.get('id'));
    this.userService.getDespacho(this.id).subscribe(resp => {
      // console.log('noticias', resp );

      if (resp.status !== 'error') {

        this.cajas = [];
        this.cajas.push(...resp.cajas);
        return;
      }
      this.despacho = resp;



    });
  }

}
