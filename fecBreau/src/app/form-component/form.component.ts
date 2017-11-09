import { Component, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Set } from '../setInterface';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  public DBOpenRequest: any;
  public db: any;
  setForm: FormGroup;

  constructor (private formBuilder: FormBuilder ) {
   }

  ngOnInit() {
    this.setForm = this.formBuilder.group({
      setName: ['', Validators.compose([Validators.required])],
      setNumber: ['', Validators.compose([Validators.required])],
      setPieces: '',
      setYear: '',
      setTheme: '',
      disabled: [false]
    });
    // Open indexDB Database...
    this.DBOpenRequest = window.indexedDB.open('setDb', 1);

    this.DBOpenRequest.onerror = function(event) {
      console.log('Loading...');
    };

    this.DBOpenRequest.onsuccess = function(event) {
      console.log('Database initialised');
    };
  }

  ngOnChanges() {
    this.db = this.DBOpenRequest.result;

    const objectStore = this.db.createObjectStore('setDatabase', { keyPath: 'setName' });
          objectStore.createIndex('setName', 'setName', { unique: false });
          objectStore.createIndex('setNnumber', 'setNnumber', { unique: true });
          objectStore.createIndex('setPieces', 'setPieces', { unique: false });
          objectStore.createIndex('setYear', 'setYear', { unique: false });
          objectStore.createIndex('setTheme', 'setTheme', { unique: false });
       console.log('anything?', objectStore);
  }

  getSet() {
    window.alert('getSet!');
  }

}

