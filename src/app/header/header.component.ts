import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  private date : Date;
  private meses: Array<string>;
  public  dia  : string;
  public  mes  : string;
  public  anio : string;

  constructor() {
    this.meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
    this.date  = new Date();
    this.dia   = this.date.getDate().toString();
    this.mes   = this.meses[this.date.getMonth()]; 
    this.anio  = this.date.getFullYear().toString();
  }

  ngOnInit() {
  }

}
