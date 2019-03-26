import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Instagram Clone';

  ngOnInit(): void {

    // Initialize Firebase ---- EYMS
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
