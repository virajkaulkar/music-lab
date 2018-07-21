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
  private headers = new Headers( {'Content-Type':'application/json'} );
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
      return this.http.get(this.apiurl).pipe(map((res: Response) => res.json()));
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
