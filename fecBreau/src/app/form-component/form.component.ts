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
  public DBOpenRequest: any;
  public db: any;

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
    const db = new AngularIndexedDB('myDb', 1);

    db.openDatabase(1, (evt) => {
      // const objectStore = evt.currentTarget.result.createObjectStore(
      //     'people', { keyPath: "id", autoIncrement: true });

      // objectStore.createIndex("name", "name", { unique: false });
      // objectStore.createIndex("email", "email", { unique: true });

      const objectStore = evt.currentTarget.result.createObjectStore(
          'setDatabase', { keyPath: 'setName', autoIncrement: true });

      objectStore.createIndex('setName', 'setName', { unique: false });
      objectStore.createIndex('setNnumber', 'setNnumber', { unique: true });
      objectStore.createIndex('setPieces', 'setPieces', { unique: false });
      objectStore.createIndex('setYear', 'setYear', { unique: false });
      objectStore.createIndex('setTheme', 'setTheme', { unique: false });

  });

  db.getByKey('people', 1).then((person) => {
    console.log(person);
    }, (error) => {
        console.log(error);
  });

  }
}

// const objectStore = this.db.createObjectStore('setDatabase', { keyPath: 'setName' });
//       objectStore.createIndex('setName', 'setName', { unique: false });
//       objectStore.createIndex('setNnumber', 'setNnumber', { unique: true });
//       objectStore.createIndex('setPieces', 'setPieces', { unique: false });
//       objectStore.createIndex('setYear', 'setYear', { unique: false });
//       objectStore.createIndex('setTheme', 'setTheme', { unique: false });
//     console.log('anything?', objectStore);
// });

