import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Set } from '../setInterface';

@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public setForm: FormGroup;

  constructor ( formBuilder: FormBuilder ) {
    this.setForm = formBuilder.group({
      setName: ['', Validators.minLength(2)],
      setNumber: ['', Validators.minLength(2)],
      setPieces: '',
      setYear: '',
      setTheme: '',
    });
   }

  ngOnInit() {
  }

}

