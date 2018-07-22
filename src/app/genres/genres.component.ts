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
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  title = "It started working";
  private apiurl = "http://dev.musiclab.com/api/genres";
  private baseUrl = "http://dev.musiclab.com/api/"
  private headers = new Headers( {'Content-Type':'application/json'} );
  data : any = {};
  successMessage = "";
  action_name = true;
  // private successMessageStatus= 0;
  nameForm: FormGroup;
  formData: any = {};
  genres: Genres = {
    genre_id:null,
    genre_title: null,

  };

  private currentUser = '';
  private local_data = localStorage.getItem('currentUser');
  private headers: any = {};
  constructor(private http: Http) {
    if((typeof this.local_data !== 'undefined' && this.local_data !== null)){
        this.currentUser = JSON.parse(this.local_data);
        this.headers = new Headers( {'Content-Type':'application/json','Authorization':'Bearer '+this.currentUser.token} );
    }
    else{
      this.router.navigate(['/login'])
    }
	   this.getGenres();
     this.getData();
	}



  ngOnInit() {
    this.getGenres();
    this.nameForm = new FormGroup ({
      genre_title: new FormControl('', {
        validators: Validators.required,
        updateOn: 'submit'
      }),

    });
  }

  getGenre(id){
    this.http.get(this.baseUrl+'genre/'+id, {'headers':this.headers}).pipe(map((res: Response) => res.json())).subscribe(single_track => {
      // console.log(single_track);
      this.genres = {
        'genre_id':single_track.id,
        'genre_title':single_track.title
      }
      this.action_name = false;

    })
  }
  getData(){
    //*ngIf="url == '' then apiurl=apiurl else apiurl=url";
    return this.http.get(this.apiurl, {'headers': this.headers}).pipe(map((res: Response) => res.json()));
  }

  getGenres() {

    this.getData().subscribe(data => {
      console.log(data);

      return this.data = data;
    })
  }

  addGenre(genreForm: NgForm) : void {
    console.log(genreForm.value);
    if(genreForm.value.genre_id){
      return this.http.put(this.baseUrl + 'genre', genreForm.value, {headers: this.headers}).toPromise()
       .then(
         ()=>{
           this.successMessage = {success:true, message:"Genre is updated successfully"};
           setTimeout(function() {
                   this.successMessage.success = false;
                   console.log(this.successMessage.message);
                    }.bind(this), 3000);
           this.getGenres();
           genreForm.resetForm();
           this.action_name = true;
         }
       )
      .catch(this.handleErrorPromise);
    }
    return this.http.post(this.baseUrl + 'genre', genreForm.value, {'headers':this.headers}).toPromise()
     .then(
       ()=>{
         this.successMessage = {success:true, message:"Genre is added in your playlist"};
         console.log(this.successMessage.message);
         setTimeout(function() {
                 this.successMessage.success = false;
                        console.log(this.successMessage.message);
                  }.bind(this), 3000);
          this.getGenres();
          genreForm.resetForm();
          this.action_name = true;
       }
     )
    .catch(this.handleErrorPromise);
  }

  deleteGenre(id){
    if(confirm(('Are you sure to delete this Genre?'))){
      return this.http.delete(this.baseUrl + 'genre/'+id, {headers: this.headers}).toPromise()
      .then(
        ()=>{
          this.successMessage = {success:true, message:"Genre is removed from your playlist"};
          this.getGenres();
        }
      }
    }

    updateGenre(id){
        return this.http.put(this.baseUrl + 'genre/'+id, {headers: this.headers}).toPromise()
        .then(
          ()=>{
            this.successMessage = {success:true, message:"Genre is removed from your playlist"};
            this.getGenre();
          }
      }


}
