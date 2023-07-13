import { Component, OnInit, inject } from '@angular/core';
import { getFirestore } from "firebase/firestore";
import { Firestore, collection, collectionData, docSnapshots  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DatabaseInstances } from '@angular/fire/database';
import { query, where } from "firebase/firestore";
import { trace } from '@angular/fire/compat/performance';
import {  doc, setDoc, getDoc } from "firebase/firestore";
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import { UserService } from '../user.service';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  

})
export class HomeComponent implements OnInit {
  showButton: boolean = false;
  formdatos: FormGroup;

  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;
  pers$: Observable<any[]>;

  constructor(private router: Router ) {
    const aCollection = collection(this.firestore, 'items');
    const personInfo = collection(this.firestore, 'personaldata');
    this.formdatos = new FormGroup({
      cedula: new FormControl()
    })

    this.items$ = collectionData(aCollection);
    this.pers$ = collectionData(personInfo);


  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showButton = true;
    }, 60000);
  
  }

  continuar(){
    this.router.navigate(['/sintomas']);

  }

  createPdf(){

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
              ['Ambato','Tungurahua',' ',' ']
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
              ['24','Masculino',' ']
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
              [' ', ' ',' ',' ']
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
              ['','',' ',' ']
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
                        [' '],
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

}