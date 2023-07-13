import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, docSnapshots, getDoc, getFirestore  } from '@angular/fire/firestore';
import { RegisterService } from '../register.service';
import { AccesoBaseService } from '../acceso-base.service';
import { toArray } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentSnapshot } from '@angular/fire/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { usuario } from '../models';
import { object } from '@angular/fire/database';
import * as rxjs from 'rxjs'
import * as rxops from 'rxjs/operators'
import {formatDate} from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  
})

export class RegistroComponent implements OnInit{


  form1: FormGroup;

  tablaVisible: boolean = false;
  formReg: FormGroup;
  formdatos: FormGroup;
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;
  pers$: Observable<any[]>;
  id: '1803002755';
  datos: Observable<any>;

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

  hoy= formatDate(new Date(), 'dd/MM/yyyy', 'en');
  opcionSeleccionada: string;
  opciones: string[] = ['De pensiones', 'Campesino', 'Individual', 'De trabajo'];
  opcionSeleccionadaec: string;
  opciones2: string[] = ['Soltero', 'Casado', 'Divorciado', 'Union libre'];
 
  myArray: any[];


  
  
  
private path ='personaldata/';
  
  constructor(  private userService: UserService,
                private router: Router,
                public accesoaseervice: AccesoBaseService,
                private firestoreServ: AngularFirestore
  ){
    this.formdatos = new FormGroup({
      cedula: new FormControl()
    })

    this.form1 = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })

    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);


    

}
ngOnInit(){
  
}


onSubmit(){  }

opcionCambiada() {

}


redirigir() {
    this.router.navigate(['/home']);
  }

modificarValor() {
    console.log(this.escivVar);
    console.log(this.hoy);
    this.tablaVisible=true;
   
    
    const data= {
      telf:     this.telf01,
      estadoc:  this.opcionSeleccionadaec,
      fecadm:   this.hoy,
      ocup:     this.ocupacion,
      empr:     this.empresa,
      estadciv: this.opcionSeleccionadaec,
      seguro: this.opcionSeleccionada,
      // referencia: this.referen,
      contemer: this.cont,
      parents: this.parent,
      dircon: this.dircon,
      telfcon: this.telfcon,   
    };
    this.accesoaseervice.updateDoc(data, '1850572858','SD2kZf14AWiQfHn8PgEc');

    this.router.navigate(['/home']);

        const pdfDefinition:any = {
          content: [
          
            {
              style: 'tableExample',
              table: {
                body: [
                  ['Institucion  del sistema', 'Unidad Operativa', 'Cod.UO','Cod. Localizacion','Numero de historia Clinica'],
                  [
                    {
        
                    },
                    
                    {
                    },
                    {
                    },
                     [
                      
                      {
                        table: {
                          body: [
                            ['Parroquia', 'Canton', 'Provincia'],
                            ['Quisapincha', 'Ambato', 'Tungurahua']
                          ]
                        },
                      }
                    ],   
                    {}
                  ]
                ]
              }
            },
            
            {text: '1 Registro de primer admision', style: 'subheader'},
            {
              style: 'tableExample',
              table: {
                widths: [200, 200, 90],
                heights: 10,
                body: [
                  ['Apellidos', 'Nombres', 'cedula'],
                  ['Sanchez Morales','Francis Joel','1850572858']
                ]
              }
            },
                {
              style: 'tableExample',
              table: {
                widths: '*',
                heights: [10, 10, 10],
                body: [
                    
                  ['Direccion', 'Barrio', 'Parroquia'],
                  ['Simon Bolivar','La Carolina','Huachi Loreto']
                ]
              }
            },
      
            {
              style: 'tableExample',
              table: {
                widths: '*',
                heights: [10, 10, 10, 10],
                body: [
                    
                  ['Canton','Provincia','Zona','Telefono'],
                  ['Ambato','Tungurahua',' ',this.telf01]
                ]
              }
            },
            
                {
              style: 'tableExample',
              
              table: {
                widths: '*',
                
                heights: [10, 10, 10, 10, 10, 10, 10],
                body: [
                  ['Fech. Naci.', 'Lugar de Nac.', 'Naciona.'],
                  ['14/07/1998','Ambato','Ecuatoriana']
                ]
              }
            },
            {
              style: 'tableExample',
              
              table: {
                widths: '*',
                
                heights: [10, 10, 10, 10, 10, 10, 10],
                body: [
                  ['Edad','Sexo','Estado Civil'],
                  ['24','Masculino',this.opcionSeleccionadaec]
                ]
              }
            },
                {
              style: 'tableExample',
              
              table: {
                widths: '*',
                
                heights: [10, 10, 10, 10, 10],
                body: [
                  ['Fech. Admision', 'Ocupacion', 'Empresa de trabajo','Tipo de S.S.'],
                  [this.hoy,this.ocupacion,this.empresa,this.opcionSeleccionada]
                ]
              }
            },
            {
              style: 'tableExample',
              
              table: {
                widths: '*',
                
                heights: [10, 10, 10, 10, 10, 10, 10],
                body: [
                  ['Referido de:'],
                  [' ']
                ]
              }
            },	
        
                {
              style: 'tableExample',
              
              table: {
                widths:  [210, 90, 90,90],
                heights: [10, 10, 10, 10],
                body: [
                  ['En caso de emergencia llamar a:', 'Parentesco','Direccion','Telefono'],
                  [this.cont,this.parent,this.dircon,this.telfcon]
                ]
              }
            },
        
                    {text: '2 Registro de nuevas admisiones para atenciones de primera vez y subsecuentes', style: 'subheader'},
                  
        
                {
              style: 'tableExample',
              table: {
                widths: [15,100,50,150,25,30,'*'],
                body: [
                    
                  ['N', 'Fecha', 'Edad','Referido de:','1era','Subs','Cod. Admisionsita'],
                  ['1','','','','','',''],
                  ['2','','','','','','']
                ]
              }
            },
        
        
        
        {text: '', pageOrientation: 'Portraip', pageBreak: 'before'},
                {text: '3 Registro de cambios', style: 'subheader'},
        
            {
              style: 'tableExample',
              color: '#444',
              table: {
                widths: [5, 60, 'auto','auto', 'auto', 150,'auto'],
                heights: 15,
                headerRows: 0,
                // keepWithHeaderRows: 1,
                body: [
                  
                  [{rowSpan: 4, text: '\n 1'}, 'Fecha', 'Estado Civil','Instruccion', 'Ocupacion', 'Empresa','Tipo de S.S.'],
                  ['', '', '','', '', '',''],
                  ['', 'Direccion' , 'Parroquia','Canton','Provincia','Zona','telefono'],
                  ['', '', '','', '', '',''],
        
                ]
              }
            },		
            
            
            {
              style: 'tableExample',
              color: '#444',
              table: {
                widths: [5, 60, 'auto','auto', 'auto', 150,'auto'],
                heights: 15,
                headerRows: 0,
                // keepWithHeaderRows: 1,
                body: [
                  
                  [{rowSpan: 4, text: '\n 2'}, 'Fecha', 'Estado Civil','Instruccion', 'Ocupacion', 'Empresa','Tipo de S.S.'],
                  ['', '', '','', '', '',''],
                  ['', 'Direccion' , 'Parroquia','Canton','Provincia','Zona','telefono'],
                  ['', '', '','', '', '',''],
        
                ]
              }
            },		
            
                {text: '4 Informacion Adicional', style: 'subheader'},		
        
                {
              style: 'tableExample',
              
              table: {
                widths:  [505],
                heights: [10],
                body: [
                  ['  '],
                  ['  '],
                  ['  '],
                  ['  '],
                ]
              }
            },
        
        
        
        
          
        {text: '', pageOrientation: 'landscape', pageBreak: 'before'},
        {text: '5 Alta Ambulatoria', style: 'subheader'},	
        {text: 'Carcteristicas', style: 'subheader'},	
                        {
              style: 'tableExample',
              
              table: {
                widths:  [50,100,70,60,150,'auto','auto'],
                heights: [10],
                body: [
                  [{rowSpan: 2, text: 'Orden'},
                  {rowSpan: 2, text: 'Fechas de admision y alta'},
                  {rowSpan: 2, text: 'Consultas de emergencia'},
                  {rowSpan: 2, text: '#Consultas externas'},
                  {rowSpan: 2, text: 'Especialidad de servicio'},
                   'Condicion de alta',
                    {rowSpan: 2, text: 'Muerto'},
                  ],
                  
                  
                  ['','','','','',
                  
                                {
                        table: {
                          widths:  [40,35,40],
                          body: [
                            ['Curado', 'Igual', 'Peor'],
                          ]
                        },
                      }
                  
                  ,''],
                  
                  
                  ['1',
                                          {
                        table: {
                          widths:  [90],
                          heights: 'auto',
                          body: [
                            [this.hoy],
                            ['     '],
                          ]
                        },
                      }
                      
                  ,'','','',
                  
                                {
                        table: {
                          widths:  [40,35,40],
                          heights: 30,
                          body: [
                            ['   ', '   ', '   '],
                          ]
                        },
                      }
                  
                  ,''],
                ]
              }
            },
        
        {text: 'Diagnostico', style: 'subheader'},	
        
        
        
        
                {
              style: 'tableExample',
              
              table: {
                widths:  [160,30,60,50,160,30,60,50],
                heights: [10],
                body: [
                  ['Diagnostico o Sindrome','CIE','Presuntivo','Definitivo','Diagnostico o Sindrome','CIE','Presuntivo','Definitivo'],
                  
                  [{table: {widths:  [150],heights: 'auto',body: [['    '],['     '],]},	} ,
                  {table: {widths:  [20],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [50],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [40],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [150],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [20],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [50],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [40],heights: 'auto',body: [['    '],['     '],]},	}
                  ]
          
                ]
              }
            },
        
        
        {text: 'Tratamiento', style: 'subheader'},	
        
        
                {
              style: 'tableExample',
              
              table: {
                widths:  [60,60,370,150],
                heights: [10],
                body: [
                  ['Clinico','Quirurgico','Procedimiento clinicos o quirurgicos principales','Codigo de responsable'],
                  
                  [{table: {widths:  [50],heights: 'auto',body: [['    '],['     '],]},	} ,
                  {table: {widths:  [50],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [360],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [140],heights: 'auto',body: [['    '],['     '],]},	}]
          
                ]
              }
            },
        
        
        
        {text: '', pageOrientation: 'landscape', pageBreak: 'before'},
        {text: '6 Egreso hospitalario', style: 'subheader'},	
        {text: 'Carcteristicas', style: 'subheader'},	
        
        
        
                        {
              style: 'tableExample',
              
              table: {
                widths:  [50,100,70,150,270],
                heights: [10],
                body: [
                  [{rowSpan: 2, text: 'Orden'},
                  {rowSpan: 2, text: 'Fechas de admision y alta'},
                  {rowSpan: 2, text: '# de dias de estadia'},
                  {rowSpan: 2, text: 'Servicio'},
                   'Condicion de alta',
                  ],
                  
                  
                  ['','','','',	{
                        table: {
                          widths:  [40,100,100],
                          body: [
                            ['Alta', 'Muerte menos de 48 horas', 'Muerte mas de 48 de horas'],
                          ]
                        },
                      }],
                  
                  
                  ['1','','','',{
                        table: {
                          widths:  [40,100,100],
                          body: [
                            [' ', '  ', ' '],
                          ]
                        },
                      }],
                ]
              }
            },
        
        
        
        
        
        
        
        
        
        
        
        {text: 'Diagnostico', style: 'subheader'},	
        
        
        
        
                {
              style: 'tableExample',
              
              table: {
                widths:  [160,30,60,50,160,30,60,50],
                heights: [10],
                body: [
                  ['Diagnostico o Sindrome','CIE','Presuntivo','Definitivo','Diagnostico o Sindrome','CIE','Presuntivo','Definitivo'],
                  
                  [{table: {widths:  [150],heights: 'auto',body: [['    '],['     '],]},	} ,
                  {table: {widths:  [20],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [50],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [40],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [150],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [20],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [50],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [40],heights: 'auto',body: [['    '],['     '],]},	}
                  ]
          
                ]
              }
            },
        
        
        {text: 'Tratamiento', style: 'subheader'},	
        
        
                {
              style: 'tableExample',
              
              table: {
                widths:  [60,60,370,150],
                heights: [10],
                body: [
                  ['Clinico','Quirurgico','Procedimiento clinicos o quirurgicos principales','Codigo de responsable'],
                  
                  [{table: {widths:  [50],heights: 'auto',body: [['    '],['     '],]},	} ,
                  {table: {widths:  [50],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [360],heights: 'auto',body: [['    '],['     '],]},	},
                  {table: {widths:  [140],heights: 'auto',body: [['    '],['     '],]},	}]
          
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
       console.log('Aquimmv');
       this.accesoaseervice.getCollectionData().subscribe((dataArray: any[]) => {
        this.myArray = dataArray;
       });

       console.log();
 }

putDat(id:string){
   console.log('llamado')
   console.log(id);
}

  

createPdf(){

      

}
}