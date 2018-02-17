import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
