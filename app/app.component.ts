import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppService } from './app.service';
import { DataStore } from './dataStore';

import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
            <div class="app" id="mainContainer">
                <div class="content">
                    <nav class="navbar navbar-default">
                      <div class="container-fluid">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header">
                          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                          </button>
                          <a class="navbar-brand" href="#">Brand</a>
                        </div>
                    
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                          <ul class="nav navbar-nav">
                            <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                            <li><a href="#">Link</a></li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                </div>
                TODO: Fix the navbar with bootstrap styling
            </div>
                
`
})
export class AppComponent {

    //VARIABLES START


    //VARIABLES END

    constructor(
        private appService: AppService
    ) { this.loadObjectList() }

    loadObjectList(): void {
        //Loads a list of objects in the datastore.
    }

    updateObjectList( dataStore ): void {
        //updates variables of an object in the datastore.
    }

    newObject(): void {
        //Create a new object and save it to the datastore.
    }

    deleteObject(event): void {
        //Delete an object fromm the datastore.
    }

}