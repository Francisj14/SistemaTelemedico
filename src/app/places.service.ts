import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where } from "firebase/firestore";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private db: AngularFirestore) { 
    
  }

  // getSupplier(name: string) {
  //   return new Promise<any>((resolve)=> {
  //     this.db.collection("personaldata",ref => ref.where('', '==', 1850572858));
  //   })
  // }

  // public getCat(documentId: string) {
  //   // return this.db.collection('personalData').doc(documentId).snapshotChanges();
  //   return this.db.collection('personalData').valueChanges();

  // }


  // getPersonal(){}

  


}
