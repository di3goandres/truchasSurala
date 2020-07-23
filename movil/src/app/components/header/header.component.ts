import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() titulo: string;
  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {}
  toggleMenu(){
    this.menuCtrl.toggle();
  }
}
