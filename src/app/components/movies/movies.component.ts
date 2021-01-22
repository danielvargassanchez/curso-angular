import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movies.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  formPeliculas: FormGroup;
  id: string = "";

  constructor(private readonly formBuilder: FormBuilder,
    private readonly movieService: MoviesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    this.formPeliculas = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      producer: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      category: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      releaseDate: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.movieService.getById(this.id).subscribe(res => {
          this.formPeliculas.get('name')?.setValue(res.name);
          this.formPeliculas.get('producer')?.setValue(res.producer);
          this.formPeliculas.get('releaseDate')?.setValue(res.releaseDate);
          this.formPeliculas.get('category')?.setValue(res.category);
        })
      }
    })
  }
  ngOnInit(): void {
  }

  save(): void {
    const data = new Movie();
    data.category = this.formPeliculas.get("category")?.value;
    data.name = this.formPeliculas.get("name")?.value;
    data.producer = this.formPeliculas.get("producer")?.value;
    data.releaseDate = this.formPeliculas.get("releaseDate")?.value;

    if (this.id) {
      this.movieService.update(data, this.id).subscribe(res => {
        this.router.navigate(['list']);
      }, error => {
        alert("ocurrio un error al actualizar el elemento");
      })
    } else {
      this.movieService.save(data).subscribe(response => {
        alert("Elemento guardad con exito",);
      },
        error => {
          alert(error.error);
        })
    }
  }

}
