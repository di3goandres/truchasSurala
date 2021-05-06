import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloading',
  templateUrl: './preloading.component.html',
  styleUrls: ['./preloading.component.scss'],
})
export class PreloadingComponent implements OnInit {

  @Input() Title:string;
  constructor() { }

  ngOnInit() {}

}
