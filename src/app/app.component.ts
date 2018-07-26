import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  /******* private urls  ***********/
  private logout_url = "http://localhost:8080/api/details";
  private currentUser : any = {};
  private local_data = localStorage.getItem('currentUser');
  private headers: any = {};
  public logged_in = true;


  constructor(
    private http: Http,
    private router: Router
  ){
    if((typeof this.local_data !== 'undefined' && this.local_data !== null)){
        this.logged_in = true;
        this.currentUser = JSON.parse(this.local_data);
        this.headers = new Headers( {'Content-Type':'application/json','Authorization':'Bearer '+this.currentUser.token} );
    }
    else{
      this.logged_in = false;
      this.router.navigate(['/login'])
    }

  }

  ngOnInit() {

  }

  /*function to logout user*/
  logout(){
    return this.http.post(this.logout_url, {}, {'headers':this.headers}).toPromise()
     .then(
       ()=>{
         this.logged_in = false;
         localStorage.clear();
         this.headers = {};
         this.router.navigate(['/login']);
    });
  }

}
