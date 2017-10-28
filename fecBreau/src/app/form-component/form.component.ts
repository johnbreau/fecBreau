import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AngularIndexedDB} from 'angular2-indexeddb';
import { Set } from '../setInterface';

@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public setForm: FormGroup;
  public db: AngularIndexedDB;

  constructor (private formBuilder: FormBuilder ) {
   }

  ngOnInit() {
    this.setForm = this.formBuilder.group({
      setName: [
        '',
        Validators.compose([Validators.required])
      ],
      setNumber: [
        '',
        Validators.compose([Validators.required])
      ],
      setPieces: '',
      setYear: '',
      setTheme: '',
      disabled: [false]
    });
    // Open indexDB Database...
    this.db = new AngularIndexedDB('setDb', 1);

    this.db.openDatabase(1, (evt) => {
      const objectStore = evt.currentTarget.result.createObjectStore(
          'id', { keyPath: 'id', autoIncrement: true },
          'setName', { keyPath: 'setName', autoIncrement: false },
          'setNnumber', { keyPath: 'setNnumber', autoIncrement: false },
          'setPieces', { keyPath: 'setPieces', autoIncrement: false },
          'setYear', { keyPath: 'setYear', autoIncrement: false },
          'setTheme', { keyPath: 'setTheme', autoIncrement: false }
        );
      objectStore.createIndex('id', 'id', { unique: true });
      objectStore.createIndex('setName', 'setName', { unique: false });
      objectStore.createIndex('setNnumber', 'setNnumber', { unique: true });
      objectStore.createIndex('setPieces', 'setPieces', { unique: false });
      objectStore.createIndex('setYear', 'setYear', { unique: false });
      objectStore.createIndex('setTheme', 'setTheme', { unique: false });
    });
   console.log('anything?', this.db); 
  }
}
