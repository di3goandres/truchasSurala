import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bandeja } from '../../models/bandejasCajas';

@Component({
  selector: 'app-bandejascaja',
  templateUrl: './bandejascaja.component.html',
  styleUrls: ['./bandejascaja.component.css']
})
export class BandejascajaComponent implements OnInit {
  @Input() idConsulta: number;
  public id;
  public bandejas: Bandeja[] = [];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getBandejasCaja(this.idConsulta).subscribe(resp => {
      // console.log('noticias', resp );

      if (resp.status !== 'error') {

        this.bandejas = [];
        this.bandejas.push(...resp.bandejas);
        return;
      }
    });
  }

}
