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

  // private successMessageStatus= 0;
  nameForm: FormGroup;
  formData: any = {};
  genres: Genres = {
    id:null,
    genre_title: null,

  };


  constructor(private http: Http) {
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

  getData(){
    //*ngIf="url == '' then apiurl=apiurl else apiurl=url";
    return this.http.get(this.apiurl).pipe(map((res: Response) => res.json()));
  }

  getGenres() {

    this.getData().subscribe(data => {
      console.log(data);

      return this.data = data;
    })
  }

  addGenre(genreForm: NgForm) : void {
    return this.http.post(this.baseUrl + 'genre', genreForm.value).toPromise()
     .then(
       ()=>{
         this.successMessage = {success:true, message:"Genre is added in your playlist"};
         this.getGenres();
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
