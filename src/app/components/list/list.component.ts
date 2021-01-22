import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movies.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns = ['_id', 'name', 'producer', 'category', 'releaseDate', 'actions'];
  dataSource = new MatTableDataSource<Movie>();

  constructor(private readonly moviesService: MoviesService,
    private readonly router: Router) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  edit(id: string) {
    this.router.navigate(['movies', id]);
  }

  delete(id: string) {
    this.moviesService.delete(id).subscribe(res => {
      this.refresh();
    }, error => {
      alert('ocurrió un error al borrar el elemento');
    })
  }

  refresh(): void {
    this.moviesService.getAll().subscribe(res => {
      this.dataSource.data = res;
    })
  }

}
