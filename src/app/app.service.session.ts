import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { JsonResponse } from './app.interface.json.response';

@Injectable()

export class SessionService {

  private date     : Date;
  private location : Location;

  public constructor(
    private http   : HttpClient,
  ) { 
    this.date = new Date();
    this.location = document.location || window.location;
  }

  public get = (key) => {
    return sessionStorage.getItem(key);
  }

  public set = (key, value) => {
    sessionStorage.setItem(key, value);
  }

  public start = (user) => {
    this.set('lgin', 'true');
    this.set('lgdt', this.date.valueOf());
    this.set('user', JSON.stringify(user));
    this.set('apps', JSON.stringify(user.applications));
  }

  public destroy = () => {
    for (let i in sessionStorage) delete sessionStorage[i];
    this.location.href = '/webapps/';
  }

  public autorize = (promise) => {
    if(this.get('lgin') === 'true') {
      let now  = this.date.valueOf();
      let diff = (now - parseInt(sessionStorage.getItem('lgdt'))) / 1000;
      if(diff <= 3600) {
        let authz = false;
        let uapps = JSON.parse(this.get('apps'));
        for (let i in uapps) if (uapps[i].uriname === this.location.pathname) authz = true;
        if(authz === true){
          let url = '/rest/ful/session.php/status';
          this
            .http
            .get<JsonResponse>(url)
            .subscribe((json) => {
              if (json.result == true) {
                this.set('lgdt', this.date.valueOf());
                promise();
              } else this.destroy();
            },(error) =>{ this.destroy()});
        } else this.destroy();
      } else this.destroy();
    } else this.destroy();
  }

}