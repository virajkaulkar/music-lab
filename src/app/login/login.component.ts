import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private error = false;
  private logged_in = true;
  private apiurl = "http://dev.musiclab.com/api/login";
  private logout_url = "http://dev.musiclab.com/api/logout";
  user: User = {
    email:"",
    password:""
  };

  private currentUser = '';
  private local_data = localStorage.getItem('currentUser');
  private headers: any = {};
  constructor(
    private http: Http,
    private router: Router
  ){
    if((typeof this.local_data !== 'undefined' && this.local_data !== null)){
        this.currentUser = JSON.parse(this.local_data);
        this.headers = new Headers( {'Content-Type':'application/json','Authorization':'Bearer '+this.currentUser.token} );
    }
    else{
      this.router.navigate(['/login'])
    }

  }


  ngOnInit() {


  }
  private headers = new Headers( {'Content-Type':'application/json','Authorization':'Bearer '} );
  login(loginForm: NgForm) : void {
      // localStorage.clear();
      this.http.post(this.apiurl, loginForm.value, {'headers':this.headers}).pipe(map((res: Response) => res.json())).subscribe(user_data => {
        console.log(user_data);
        this.logged_in = true;
        localStorage.setItem('currentUser', JSON.stringify({ token: user_data.success.token, name: user_data.success.name }));
        loginForm.resetForm();
        window.location.href = '/home';
        // this.router.navigate(['/home'])
      },
      error=>{
        console.log(error);
        this.error = {'error':true, 'message':'You have entered wrong email or password'};
        this.logged_in = false;
        setTimeout(function() {
                this.error.error = false;
                 }.bind(this), 3000);
      }
    )



}
}
