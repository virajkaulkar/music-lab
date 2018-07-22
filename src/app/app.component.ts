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

  private logout_url = "http://dev.musiclab.com/api/details";
  private currentUser = '';
  private local_data = localStorage.getItem('currentUser');
  private headers: any = {};
  private logged_in = true;

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


  logout() : void {
    return this.http.post(this.logout_url, {}, {'headers':this.headers}).toPromise()
     .then(
       ()=>{
         this.successMessage = {success:true, message:"Track is added in your playlist"};
         this.logged_in = false;
         console.log(this.successMessage.message);

         localStorage.clear();
         this.headers = {};
         this.router.navigate(['/login']);
     )
    .catch(this.handleErrorPromise);

  }

}
