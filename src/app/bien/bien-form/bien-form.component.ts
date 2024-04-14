import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Bien } from '../../models/bien.model';
import { BienService } from '../../services/bien.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-bien-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bien-form.component.html',
  styleUrls: ['./bien-form.component.css']
})
export class BienFormComponent implements OnInit {
  @Input() bien?: Bien;
  bienForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bienService: BienService,
    private router: Router
  ) {
    this.bienForm = this.formBuilder.group({
      mailProprio: ['', Validators.required, Validators.email],
      commune: ['', Validators.required],
      rue: ['', Validators.required],
      cp: ['', Validators.required],
      nbCouchages: ['', Validators.required],
      nbChambres: ['', Validators.required],
      distance: ['', Validators.required],
      prix: ['', Validators.required],
      image: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.bien) {
      this.bienForm.patchValue(this.bien);
    }
  }

  onSubmit(): void {
    if (this.bienForm.valid) {
      const formData = this.bienForm.value;
      if (this.bien) {
        this.bienService.updateBien(formData).subscribe(() => {
          this.router.navigate(['/biens']);
        });
      } else {
        this.bienService.addBien(formData).subscribe(() => {
          this.router.navigate(['/biens']);
        });
      }
    }
  }
}
