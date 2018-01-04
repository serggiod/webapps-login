import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../app.interface.json.response';
import { SessionService } from '../app.service.session';
import { Component, OnInit } from '@angular/core';

@Component({
  selector    : 'app-logout',
  templateUrl : './logout.component.html',
  styleUrls   : ['./logout.component.css'],
  providers   : [SessionService,HttpClient]
})

export class LogoutComponent implements OnInit {

  private router  : Router;
  private lgin    : String;
  public  display : String;

  constructor(
    private $Router : Router,
    private session : SessionService,
    private http    : HttpClient
  ) {
    this.router  = $Router;
    this.display = 'hide';
    this.lgin    = this.session.get('lgin');
  }

  ngOnInit() {
    if(this.lgin === 'true') this.display = 'show';
    else this.router.navigate(['/login']);
  }

  public aceptar = ()=>{
    let url = '/rest/ful/session.php/destroy';
    this
      .http
      .delete<JsonResponse>(url)
      .subscribe((json)=>{
        if(json.result === true){
          this
            .session
            .destroy();
          this
            .router
            .navigate(['/login']);
        } 
      });
  }

  public cancelar = ()=>{
    this
      .router
      .navigate(['/applications']);
  }

}