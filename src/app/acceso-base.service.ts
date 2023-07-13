import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AccesoBaseService {

  constructor(public database: AngularFirestore) {   }




  createDoc(data: any, path:string, id:string){
    const collection = this.database.collection(path);
    collection.doc(id).set(data);
  }

  getDoc(path: string, id: string){
      const collection=this.database.collection(path);
      return collection.doc(id).valueChanges()
  }

  obetnerDocumento(path: string, id: string){
    const collection=this.database.collection(path);
    return collection.doc(id).valueChanges();
  }



  deleteDoc(path: string, id: string){
    const collection=this.database.collection(path);
    return collection.doc(id).delete();
  }


  updateDoc(data: any,path: string, id: string){
    const collection=this.database.collection(path);
    
    return collection.doc(id).update(data);
  }

  getCollection<tipo>(path: string){
    const collection=this.database.collection<tipo>(path);
    // this.database.collection('1850572858').valueChanges().pipe(toArray());
    return collection.valueChanges();
  }

  gettablas<tipo>(path: string){
    const collection=this.database.collection<tipo>(path);
    return collection.valueChanges(); 
  }

  getCollectionData(): Observable<any[]> {
    return this.database.collection('myCollection').valueChanges().pipe(
      toArray()
    );
  }

}

