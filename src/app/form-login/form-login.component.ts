import { Md5 }  from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { applications } from '../app.interface.applications';
import { JsonResponse } from '../app.interface.json.response';
import { SessionService } from '../app.service.session';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector    : 'app-form-login',
  templateUrl : './form-login.component.html',
  styleUrls   : ['./form-login.component.css'],
  providers   : [SessionService,HttpClient]
})

export class FormLoginComponent implements OnInit {

  private router  : Router;
  public  user    : string;
  public  pass    : string;
  public  error   : string;
  public  success : string;

  constructor(
    private $Router : Router,
    private http    : HttpClient,
    private session : SessionService
  ) {
      this.router  = $Router;
      this.user    = '';
      this.pass    = '';
      this.error   = 'hide';
      this.success = 'hide';
  };

  ngOnInit() {
  };

  public focus = () => {
    this.error   = 'hide';
    this.success = 'hide';
  }

  public login = () => {
    let url  = '/rest/ful/session.php/login';
    let pass = Md5.hashStr(this.pass);
    let json = {user:this.user,pass:pass};
    this
			.http
			.post<JsonResponse>(url,json)
			.subscribe((json) => {
        if(json.result === true){
          
          let apps:Array<applications> = new Array;
          for(let i in json.rows.applications) if(json.rows.applications[i].uriname.indexOf('webapps/')>=1) apps.push(json.rows.applications[i]);
          json.rows.applications = apps;
          
          this
            .session
            .start(json.rows);

          this
            .router
            .navigate(['/applications']);

        } else this.error = 'show';
			},()=>{ this.error = 'show';});
  };

}
