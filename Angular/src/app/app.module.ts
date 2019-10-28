import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LegendsComponent } from './Legends/Legends.component';
import { LegendListComponent } from './Legends/Legend-list/Legend-list.component';
import { LegendDetailComponent } from './Legends/Legend-detail/Legend-detail.component';
import { LegendItemComponent } from './Legends/Legend-list/Legend-item/Legend-item.component';

import { DropdownDirective } from './shared/dropdown.directive';

import { AppRoutingModule } from './app-routing.module';
import { LegendStartComponent } from './Legends/Legend-start/Legend-start.component';

import { LegendService } from './Legends/Legend.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material';
import { MaterialModule } from '../material-module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LegendsComponent,
    LegendListComponent,
    LegendDetailComponent,
    LegendItemComponent,

    DropdownDirective,
    LegendStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ LegendService],
  bootstrap: [AppComponent]
})
export class AppModule {}
