import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';


//recordatorio: declaraciones/exports para componentes, imports para módulos

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class SharedModule { }
