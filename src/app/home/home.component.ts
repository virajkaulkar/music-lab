import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise';
// import alert service and component

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "It started working";
  private apiurl = "http://dev.musiclab.com/api/tracks";
  private baseUrl = "http://dev.musiclab.com/api/"

  private headers = new Headers( {'Content-Type':'application/json',
                        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg2OWJhNjI2MjU1ZGU5YjMzNTFkNTBjMTA1ZWUwMzQ0OTM0OTBiZGJkMzBiODgwNTJiNTQwYjZmZDA2MjQwZmVmY2I1NDAwZThlZDY3MDVhIn0.eyJhdWQiOiIxIiwianRpIjoiODY5YmE2MjYyNTVkZTliMzM1MWQ1MGMxMDVlZTAzNDQ5MzQ5MGJkYmQzMGI4ODA1MmI1NDBiNmZkMDYyNDBmZWZjYjU0MDBlOGVkNjcwNWEiLCJpYXQiOjE1MzIyNDQ1MDgsIm5iZiI6MTUzMjI0NDUwOCwiZXhwIjoxNTYzNzgwNTA4LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.HO5pOrSixhmVmqJw337VDzd8Ok8kvwiWsqi0XQtBlKdskYvxg1w5qg35JFprqEIcGrDU7a-aVEEG-c4PHnPSJZAGJkmUn7PqHOivR9q66Bl9SioFgBLsiSItrkc6I77UZ5_fSTAT6NfCJk1CqGX1QXTXFKJIlfdZrSDKY4YNMhtMWYBfpAMu3ZQFMDIdpmLYtXKrTO_XRkpdbgxF96xkr13p00eBCchMiL2f0SvbbMrPIxMLlBcPfjs8rXa-SL7xUxT1mTfNnXuPTcx6jGwCunSdzv7VXdKQErVQLWYuqMmDdoxA5fbXXLqrf9iqfgjkDmVwcTZCtBGlml9vWbYbs4tIqksIlhC9k0EXKLPXHA_on-ayGX5RsrXUsc8L7anix-nos0qDxJfQpkr6MBsxKt6T42U3iJn2jJT2x4Vm3jn8UpAEfwMNNyVkxD9HV3mGSuSy8Tzt_lDqqLgVRoMB_VO67GmYvrL29tyrNJgQ6EI9e4fK_HfoHXuf9gbzGNaVYb0Mk9ggRJJY9RI3TZz28tGURmi8lN-EJRIxbZk0POqUGForvKWkf9HxnWtsnxTBc5OPV3FsKuq3JWp1MOWBKp9Y6bx1rumnvRbMuT6KL8eG2BUq1-EsCrgdpp1MsZVJvXz75RYV_P9IRewCID40MbfPWt5Jp0wiLLpoLkV9Yvg'} );
  data : any = {};
  single_track : any = {};
  successMessage = "";
  action_name = true;
  //pagination variables
  p: number = 1;
  //collection: any[] = someArrayOfThings;
  // private successMessageStatus= 0;
  nameForm: FormGroup;
  formData: any = {};
  tracks: Tracks = {
    id:null,
    track_title: '',
    genre:"-1",
    ratings:"-1",
  };

  genres: Genres[] = [];

  ratings: Ratings[] = [
    { id:1, name: 1 },
    { id:2, name: 2 },
    { id:3, name: 3 },
    { id:4, name: 4 }
  ];

  constructor(private http: Http) {
	   this.getTracks();
     this.getData();
     this.getGenres();
	}

  getGenres() {
      this.http.get(this.baseUrl+'genres').pipe(map((res: Response) => res.json())).subscribe(data => {
        return this.genres = data;
      })
  }

  ngOnInit() {
    this.getTracks();
    this.nameForm = new FormGroup ({
      track_title: new FormControl('', {
        validators: Validators.required,
        updateOn: 'submit'
      }),

    });
  }

  getTrack(id){
    this.http.get(this.baseUrl+'track/'+id).pipe(map((res: Response) => res.json())).subscribe(single_track => {
      // console.log(single_track);
      this.tracks = {
        'id':single_track.id,
        'track_title':single_track.title,
        'genre':single_track.genre_id,
        'ratings':single_track.ratings
      }
      this.action_name = false;

    })
  }

  getData(name){
    if(!name){
      return this.http.get(this.apiurl, {'headers':this.headers}).pipe(map((res: Response) => res.json()));
    }
    else{
      return this.http.get(this.baseUrl + 'track?name=' + name).pipe(map((res: Response) => res.json()));
    }
    //*ngIf="url == '' then apiurl=apiurl else apiurl=url";

  }

  getTracks() {
    this.getData().subscribe(data => {
      return this.data = data;
    })
  }

  addTrack(trackForm: NgForm) : void {
    if(trackForm.value.track_id){
      return this.http.put(this.baseUrl + 'track', trackForm.value, {headers: this.headers}).toPromise()
       .then(
         ()=>{
           this.successMessage = {success:true, message:"Track is updated successfully"};
           console.log(this.successMessage.message);
           setTimeout(function() {
                   this.successMessage.success = false;
                          console.log(this.successMessage.message);
                    }.bind(this), 3000);
           this.getTracks();
           trackForm.resetForm();
         }
       )
      .catch(this.handleErrorPromise);
    }
    return this.http.post(this.baseUrl + 'track', trackForm.value).toPromise()
     .then(
       ()=>{
         this.successMessage = {success:true, message:"Track is added in your playlist"};
         console.log(this.successMessage.message);
         setTimeout(function() {
                 this.successMessage.success = false;
                        console.log(this.successMessage.message);
                  }.bind(this), 3000);
         this.getTracks();
         trackForm.resetForm();
       }
     )
    .catch(this.handleErrorPromise);
  }

  deleteTrack(id){
    if(confirm(('Are you sure to delete this track?'))){
      return this.http.delete(this.baseUrl + 'track/'+id, {headers: this.headers}).toPromise()
      .then(
        ()=>{
          this.successMessage = {success:true, message:"Track is removed from your playlist"};
          setTimeout(function() {
                  this.successMessage.success = false;
                         console.log(this.successMessage.message);
                   }.bind(this), 3000);
           this.tracks = {
             'id':'',
             'track_title':'',
             'genre':'',
             'ratings':''
           }
           this.action_name = true;
          this.getTracks();
        }
      }
    }

    updateTrack(id){
        return this.http.put(this.baseUrl + 'track/'+id, {headers: this.headers}).toPromise()
        .then(
          ()=>{
            this.successMessage = {success:true, message:"Track is removed from your playlist"};
            this.getTracks();
          }
      }

      getTracksByName(name){
        console.log(name);
        this.getData(name).subscribe(data => {
          return this.data = data;
        })
      }


}
