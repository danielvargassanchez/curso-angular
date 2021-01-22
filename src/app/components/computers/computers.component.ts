import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Computer } from 'src/app/models/compute.model';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {

  form: FormGroup
  constructor(private formBuilder: FormBuilder, private readonly computerService: ComputersService) {
    this.form = this.formBuilder.group({
      brand: ['', Validators.required, Validators.minLength(1)],
      memory: ['', Validators.required, Validators.min(1)],
      size: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  save(): void {
    const data = new Computer();
    data.brand = this.form.get("brand")?.value;
    data.memory = this.form.get("memory")?.value;
    data.size = this.form.get("size")?.value;
    this.computerService.saveComputer(data).subscribe(response => {
      alert("Elemento guardad con exito");
    },
      error => {
        alert(error.error);
      })

  }

}
