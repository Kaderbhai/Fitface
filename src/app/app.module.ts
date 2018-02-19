import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { ParseFitFileService } from './parse-fit-file.service';
import { FitnessDataService } from './fitness-data.service';


@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [ParseFitFileService, FitnessDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
