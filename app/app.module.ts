import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppService } from './app.service';
import { AppComponent }   from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,

    ],

    providers: [
        AppService,
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }