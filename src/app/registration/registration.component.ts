import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private apiurl = "http://dev.musiclab.com/api/register";
  user: User = {
    id:null,
    name: "",
    email:"",
    password:""
  };
  private headers = new Headers( {'Content-Type':'application/json' } );
  constructor(
    private http: Http,
    private router: Router
  ){}


  ngOnInit() {
  }

  register(registerForm: NgForm) : void {
      this.http.post(this.apiurl, registerForm.value, {'headers':this.headers}).pipe(map((res: Response) => res.json())).subscribe(user_data => {
        console.log(user_data);
        localStorage.setItem('currentUser', JSON.stringify({ token: user_data.success.token, name: user_data.success.name }));
        registerForm.resetForm();
        this.router.navigate(['/home'])
      })

  }

}
