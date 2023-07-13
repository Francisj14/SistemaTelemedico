import { Component, OnInit, inject } from '@angular/core';
import { Route } from '@angular/router';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, docSnapshots, getDoc, getFirestore  } from '@angular/fire/firestore';
import { RegisterService } from '../register.service';
import { AccesoBaseService } from '../acceso-base.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DocumentSnapshot } from '@angular/fire/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { usuario } from '../models';
import { object } from '@angular/fire/database';
import * as rxjs from 'rxjs'
import * as rxops from 'rxjs/operators'
import {formatDate} from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent implements OnInit {
  form1: FormGroup;
intento: string='Hola';
  tablaVisible: boolean = false;
  tablaVisible1: boolean = false;
  formReg: FormGroup;
  formdatos: FormGroup;
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;
  pers$: Observable<any[]>;
  id: '1803002755';
  datos: Observable<any>;
  form: FormGroup;
  Data: Array<any> = [
    { name: 'Cardiopatia', value: 'pear' },
    { name: 'Diabetes', value: 'plum' },
    { name: 'Encefalo Cardiovascular', value: 'kiwi' },
    { name: 'Hipertension', value: 'apple' },
    { name: 'Cancer', value: 'lime' },
    { name: 'Tuberculosis', value: 'pear' },
    { name: 'Enfermedad Mental', value: 'plum' },
    { name: 'Enfermedad Infecciosa', value: 'kiwi' },
    { name: 'Otro antecedente', value: 'apple' },
    { name: 'Sin antecedentes', value: 'lime' },
  ];

  motiv: String;
  problemac: String;
  antper: String;


  telf01: String;
  estado:String;
  admision:String;
  ocupacion:String;
  empresa:String;
  segsoc:String;
  referen:String;
  cont:String;
  parent:String;
  dircon:String;
  telfcon:String;
  escivVar: String;
  cardiopat: String;
  antf0: String;
  antf1: String;
  antf2: String;
  antf3: String;
  antf4: String;
  antf5: String;
  antf6: String;
  antf7: String;

  isChecked0: boolean = false;
  isChecked1: boolean = false;
  isChecked2: boolean = false;
  isChecked3: boolean = false;
  isChecked4: boolean = false;
  isChecked5: boolean = false;
  isChecked6: boolean = false;
  isChecked7: boolean = false;

  

  hoy= formatDate(new Date(), 'dd/MM/yyyy', 'en');
  opcionSeleccionada: string;
  opciones: string[] = [ 'De pensiones', 'Campesino', 'Individual', 'De trabajo'];
  opcionSeleccionadaec: string;
  opciones2: string[] = ['Soltero', 'Casado', 'Divorciado', 'Union libre'];

  questions = [
    {
      question: 'Antecedentes familiares',
      options: ['Rojo', 'Azul', 'Amarillo', 'Verde'],
      answers: [],
    }
  ];



 

  private path ='personaldata/';
  
  constructor(  private userService: UserService,
                private router: Router,
                public accesoaseervice: AccesoBaseService,
                private fb: FormBuilder
  ){
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });


    this.formdatos = new FormGroup({
      cedula: new FormControl()
    })

    this.form1 = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })

    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
    // const personInfo = collection(this.firestore, 'personaldata');
    // this.pers$ = collectionData(personInfo);

}
ngOnInit(){


}


onSubmit(){  }

opcionCambiada() {

}

submitQuiz() {
  let totalScore = 0;
  let obtainedScore = 0;

  this.questions.forEach(question => {
    totalScore += question.answers.length;
    question.answers.forEach(answer => {
      if (question.options.includes(answer)) {
        obtainedScore++;
      }
    });
  });

  alert(`Tu puntuación: ${obtainedScore}/${totalScore}`);
}

redirigir() {
    this.router.navigate(['/home']);
  }

modificarValor() {
    // console.log(this.escivVar);
    // console.log(this.hoy);




    this.tablaVisible=true;
    const data= {
      motivo:     this.motiv, 
      problem:    this.problemac,
      anttpers:     this.antper 
    };

    console.log(data);

  }


 getProduct(path: String, id: string){
    this.accesoaseervice.updateDoc
 }

 saveUsuario(){
  const data = { nombre: 'prueba',  precio: '30'}
  const path = 'persondaldata/'
  const id ='1850184613'
  this.accesoaseervice.createDoc(data,path,id);
 }

 getUsuarios(id: string){
   const personInfo = collection(this.firestore, id);
   this.pers$ = collectionData(personInfo);
       this.tablaVisible=true;
 }

putDat(id:string){
   console.log('llamado')
   console.log(id);
}

onCheckboxChange(e: any) {
  const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: any) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }

  this.modificarValor();
}
submitForm() {
  console.log(this.form.value);
}



createPdf(){

 if (this.isChecked0) {
    this.antf0 = 'x';
 }else{
  this.antf0 = ' ';
 }

 if (this.isChecked1) {
  this.antf1= 'x';
}else{
  this.antf1 = ' ';
 }

if (this.isChecked2) {
  this.antf2 = 'x';
}else{
  this.antf2 = ' ';
 }

if (this.isChecked3) {
  this.antf3 = 'x';
}else{
  this.antf3 = ' ';
 }

if (this.isChecked4) {
  this.antf4 = 'x';
}else{
  this.antf4 = ' ';
 }

if (this.isChecked5) {
  this.antf5 = 'x';
}else{
  this.antf5 = ' ';
 }

if (this.isChecked6) {
  this.antf6 = 'x';
}else{
  this.antf6 = ' ';
 }

if (this.isChecked7) {
  this.antf7 = 'x';
}else{
  this.antf7 = ' ';
 }

console.log(this.antf0,
            this.antf1,
            this.antf2,
            this.antf3,
            this.antf4,
            this.antf5,
            this.antf6,
            this.antf7);
  const data= {
    motivo:     this.motiv, 
    problem:    this.problemac,
    anttpers:     this.antper 
  };


  const pdfDefinition:any = {
    content: [
    
      {
        style: 'tableExample',
        table: {
          widths: '*',
          heights: 10,
          body: [
            ['Establecimiento', 'Nombre', 'Apellido','Sexo','Edad'],
            [' ', 'Francis Joel', 'Sanchez Morales','M','24']
          ]
        }
      },
      
      
      {
        style: 'tableExample',
        table: {
          widths: [ '*'],
          heights: 10,
          body: [
            [{text: '1 Motivo de Consulta', style: 'subheader'}],
            [this.motiv]
          ]
        }
      },
      
       {
        style: 'tableExample',
        table: {
          widths: [ '*'],
          heights: 10,
          body: [
            [{text: '2 Enfermedad o problema actual', style: 'subheader'}],
            [this.problemac]
          ]
        }
      },
      
       {
        style: 'tableExample',
        table: {
          widths: [ '*'],
          heights: 10,
          body: [
            [{text: '3 Antecedentes Personales', style: 'subheader'}],
            [this.antper]
          ]
        }
      },
      
      {text: '4 Antecedentes Familiares', style: 'subheader'},
      { style: 'tableExample',
      table: {
        widths: [150,5,300],
        heights: 10,
        body: [
          ['Cardiopatia',this.antf0,''],
          ['Diabetes',this.antf1,''],
          ['Encefalo cardiovascular',this.antf2,''],
          ['Hipertension',this.antf3,''],
          ['Tuberculosis',this.antf4,''],
          ['Enfermedad mental',this.antf5,''],
          ['Otro Antecedente',this.antf6,''],
          ['Sin Antecedente',this.antf7,''],
        ]
      }
    }, 

    {text: '5 Revision actual de organos', style: 'subheader'},      
      
     
          
          
          
                       
       { style: 'tableExample',
        table: {
          widths: '*',
          heights: 10,
          body: [
            [' ','Con Evidencia Patologica','Sin evidencia Patologica'],
            ['Organos de los sentidos',' ',' '],
            ['Respiratorio',' ',' '],
            ['Cardio Vascular',' ',' '],
            ['Digestivo',' ',' '],
            ['Genital',' ',' '],
            ['Urinario',' ',' '],
            ['Musculo esqueletico',' ',' '],
            ['Endocrino',' ',' '],
            ['Hemo Linfatico',' ',' '],
            ['Nervioso',' ',' ']
            
          ]
        }
      }, 
          
          
          {text: '', pageOrientation: 'Portraip', pageBreak: 'before'},

          {text: '6 Signos Vitales y Antropometria', style: 'subheader'},
          
                   
             {
        style: 'tableExample',
        table: {
          widths: [150,'*','*','*'],
          heights: 10,
          body: [
            ['Fecha de medicion',this.hoy,' ', ' '],
            ['Temperatura Corporal  °C','36.5',' ',' '],
            ['Presion Arterial','',' ',''],
            ['Pulso(Bpm)','65',' ',''],
            ['Oxigenacion(SPO2)','96',' ',''],
            ['Peso(Kg)','50',' ',''],
            ['Talla(m)','1.68',' ','']
          ]
        }
      },          
          
          {text: '7 Examen Fisico Regional', style: 'subheader'},
          
                   
       { style: 'tableExample',
        table: {
          widths: '*',
          heights: 10,
          body: [
            ['','Con Evidencia Patologica','Sin evidencia Patologica'],
            ['Cabeza',' ',' '],
            ['Cuello',' ',' '],
            ['Torax',' ',' '],
            ['Abdomen',' ',' '],
            ['Pelvis',' ',' '],
            ['Extremidades',' ',' ']
            
          ]
        }
      },             
          
       {
        style: 'tableExample',
        
        table: {
          widths: '*',
          
          heights: [10, 10, 10, 10, 10, 10, 10],
          body: [
            [' '],
            [' ']
          ]
        }},       
          
          
           {text: '8 Diagnostico', style: 'subheader'},
          
                   
       { style: 'tableExample',
        table: {
          widths: [5,330,70,70],
          heights: 10,
          body: [
            ['','','Presuntivo','Definitivo'],
            ['1','',' ',' '],
            ['2','',' ',' '],
            ['3','',' ',' '],
            ['4','',' ',' ']
            
          ]
        }
      },                     
          
          
          
          
        {
        style: 'tableExample',
        table: {
          widths: [ '*'],
          heights: 10,
          body: [
            [{text: '9 Plan de tratamiento', style: 'subheader'}],
            [' '],
            [' '],
            [' '],
          ]
        }
      },           
          
          
    
           {
        style: 'tableExample',
        table: {
          widths: [70,70,210,130],
          heights: [10, 10, 10, 10],
          body: [
              
            ['Fecha','Hora','Nombre del profesional','Firma'],
            [' ',' ',' ',' ']
          ]
        }
      },     
          
          
        ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }
    
    
  }

    const pdf=pdfMake.createPdf(pdfDefinition);
    pdf.open();

}

}


  


