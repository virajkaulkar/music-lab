import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
// import 'rxjs/add/operator/toPromise';
// import alert service and component

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /********* private variables ***************/
  title = "It started working";
  private apiurl = "http://localhost:8080/api/tracks";
  private baseUrl = "http://localhost:8080/api/"
  public are_tracks = true;
  public are_genres = true;
  data : any = {};
  single_track : any = {};
  public successMessage : any = {};
  action_name = true;
  //pagination variables
  p: number = 1;
  nameForm: FormGroup;
  formData: any = {};
  tracks: any = {
    id:null,
    track_title: '',
    genre:"-1",
    ratings:"-1",
  };

  genres: any = [];

  ratings: any = [
    { id:1, name: 1 },
    { id:2, name: 2 },
    { id:3, name: 3 },
    { id:4, name: 4 }
  ];

  private currentUser : any  = {};
  private local_data = localStorage.getItem('currentUser');
  private headers: any = {};

  constructor(private http: Http, private router: Router) {
    if((typeof this.local_data !== 'undefined' && this.local_data !== null)){
        this.currentUser = JSON.parse(this.local_data);
        this.headers = new Headers( {'Content-Type':'application/json','Authorization':'Bearer '+this.currentUser.token} );
    }
    else{
      this.router.navigate(['/login'])
    }
	   this.getTracks();
     this.getData();
     this.getGenres();
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
  /****** function to get all available genres ***********/
  getGenres() {
    console.log(this.headers);
      this.http.get(this.baseUrl+'genres', {'headers':this.headers}).pipe(map((res: Response) => res.json())).subscribe(data => {
        if(data.length > 0){
          this.are_genres = true;
        }
        else{
          this.are_genres = false;
        }
        return this.genres = data;
      })
  }
  /****** function to find track by its id ***********/
  getTrack(id){
    this.http.get(this.baseUrl+'track/'+id, {'headers':this.headers}).pipe(map((res: Response) => res.json())).subscribe(single_track => {
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

  /****** function to returns tracks to getTrack() ***********/
  getData(name=''){
    if(!name){
      return this.http.get(this.apiurl, {'headers':this.headers}).pipe(map((res: Response) => res.json()));
    }
    else{
      return this.http.get(this.baseUrl + 'track?name=' + name, {'headers':this.headers}).pipe(map((res: Response) => res.json()));
    }
  }

  /****** function to get all available tracks ***********/
  getTracks() {
    this.getData().subscribe(data => {
      if(data.data.length > 0){
        this.are_tracks = true;
      }
      else{
        this.are_tracks = false;
      }
      return this.data = data;
    })
  }
  /****** function to add new track ***********/
  addTrack(trackForm: NgForm) {
    if(trackForm.value.track_id){
      return this.http.put(this.baseUrl + 'track', trackForm.value, {headers: this.headers}).toPromise()
       .then(
         ()=>{
           this.successMessage = {success:true, message:"Track is updated successfully"};
           setTimeout(function() {
                   this.successMessage.success = false;
                   console.log(this.successMessage.message);
                    }.bind(this), 3000);
           this.getTracks();
           trackForm.resetForm();
           this.action_name = true;
         }
       );
      // .catch(this.handleErrorPromise);
    }
    return this.http.post(this.baseUrl + 'track', trackForm.value, {'headers':this.headers}).toPromise()
     .then(
       ()=>{
         this.successMessage = {success:true, message:"Track is added in your playlist"};
         setTimeout(function() {
                 this.successMessage.success = false;
                        console.log(this.successMessage.message);
                  }.bind(this), 3000);
         this.getTracks();
         trackForm.resetForm();
         this.action_name = true;
       }
     );
    // .catch(this.handleErrorPromise);
  }

  /****** function to delete previously added track ***********/
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
        })
      }
    }

    /****** function to update added track ***********/
    updateTrack(id){
        return this.http.put(this.baseUrl + 'track/'+id, {headers: this.headers}).toPromise()
        .then(
          ()=>{
            this.successMessage = {success:true, message:"Track is removed from your playlist"};
            this.getTracks();
          });
      }

      /****** function to search track ***********/
      getTracksByName(name){
        this.getData(name).subscribe(data => {
          return this.data = data;
        })
      }


}
