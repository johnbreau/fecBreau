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
    const db = new AngularIndexedDB('Sets', 1);

    db.openDatabase(1, (evt) => {
      const objectStore = evt.currentTarget.result.createObjectStore(
          'setDatabase', { keyPath: 'setName', autoIncrement: true });

      objectStore.createIndex('setName', 'setName', { unique: false });
      objectStore.createIndex('setNnumber', 'setNnumber', { unique: true });
      objectStore.createIndex('setPieces', 'setPieces', { unique: false });
      objectStore.createIndex('setYear', 'setYear', { unique: false });
      objectStore.createIndex('setTheme', 'setTheme', { unique: false });

  });

  db.getByKey('setDatabase', 1).then((person) => {
    console.log(person);
    }, (error) => {
        console.log(error);
  });

  // db.getAll('setDatabase').then((people) => {
  //   console.log(people);
  // }, (error) => {
  //     console.log(error);
  // });
  }
}

// this.db.createStore(1, (evt) => {
//   const objectStore = evt.currentTarget.result.createObjectStore(
//     'setDatabase', {keyPath: 'setName', unique: true});





// constructor(private r: ComponentFactoryResolver,
//   private rs: RestService,
//   private d: DataService,
//   private i: IndexedDBService
// ) {
// this.c = r.resolveComponentFactory(ChooseAccountProfileComponent);
// this.db = new AngularIndexedDB('usersDB', 1);

// this.db.createStore(1, (evt) => {
// const objectStore = evt.currentTarget.result.createObjectStore('users', {keyPath: 'id', unique: true});

// objectStore.createIndex('remembered', 'remembered');

// }).then(() => {
// this.getAllUsers();
// }, (error) => {
// console.log(error);
// });
// }

// // Get all users in the database.
// getAllUsers() {
// this.db.getAll('users').then((users) => {
// let oldcounter = 0;
// const kleurenArray = ['#1ccc49', '#e10d6d', '#11afe0', '#7dd317', '#d95f16', '#b0990d', '#7510cc'];

// for (let i = 0; i < users.length; i++) {
// // put the json in an object.
// const obj = users[i];
// // Make the component.
// const cmpRef = this.v.createComponent(this.c);
// // Fill the component with the correct values.
// cmpRef.instance.name = obj.username;
// cmpRef.instance.id = obj.id;
// do {
// var counter = Math.floor(Math.random() * 7);
// }
// while (oldcounter === counter);
// oldcounter = counter;
// cmpRef.instance.image = '../../../assets/images/Avatars/avatar-    bg-col' + counter + '.png';
// cmpRef.instance.color = kleurenArray[counter];
// }
// }, (error) => {
// console.log(error);
// });
// }