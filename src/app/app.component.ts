import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData  } from '@angular/fire/firestore';

import { RouterLinkActive } from '@angular/router';
import { Database,set,ref,update } from '@angular/fire/database';
import { getDatabase } from "firebase/database";

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SistemaTelemedico';

}
