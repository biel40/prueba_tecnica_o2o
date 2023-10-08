import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BeerService } from './services/beer.service';
import { HttpClientModule } from '@angular/common/http';
import { BeerListComponent } from './components/beer-list/beer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BeerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    MaterialModule, 
    BrowserAnimationsModule ,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
