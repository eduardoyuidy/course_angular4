import { Component, OnInit } from '@angular/core';

// const firebase = require('firebase/app');
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Instagram Clone';

  ngOnInit(): void {

    // *TODO Initialize Firebase with atributes (EYMS)
    const config = {
      apiKey: 'apikey',
      authDomain: 'authDomain',
      databaseURL: 'databaseURL',
      projectId: 'projectId',
      storageBucket: 'storageBucket',
      messagingSenderId: 'messagingSenderId'
    };

    firebase.initializeApp(config);

  }
}
