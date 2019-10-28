import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LegendsComponent } from './legends/legends.component';
import { LegendListComponent } from './legends/legend-list/legend-list.component';
import { LegendDetailComponent } from './legends/legend-detail/legend-detail.component';
import { LegendItemComponent } from './legends/legend-list/legend-item/legend-item.component';

import { DropdownDirective } from './shared/dropdown.directive';

import { AppRoutingModule } from './app-routing.module';
import { LegendStartComponent } from './legends/legend-start/legend-start.component';

import { LegendService } from './legends/legend.service';
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
