import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../app.interface.json.response';
import { SessionService } from '../app.service.session';
import { Component, OnInit } from '@angular/core';

interface applications {
  uriname : string,
  name    : string
}

@Component({
  selector    : 'app-applications',
  templateUrl : './applications.component.html',
  styleUrls   : ['./applications.component.css'],
  providers   : [SessionService,HttpClient]
})

export class ApplicationsComponent implements OnInit {

  private router  : Router;
  public  apps    : Array<applications>;
  public  display : String;

  constructor(
    private $Router : Router,
    private session : SessionService,
    private http    : HttpClient
  ) {
    this.display = 'hide';
    let apps = this.session.get('apps');
    
    if(apps === null){
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
    
    else{
      this.apps    = JSON.parse(apps);
      this.display = 'show';
    }
  }

  ngOnInit() {
  }

}
