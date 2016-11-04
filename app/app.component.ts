import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppService } from './app.service';
import { DataStore } from './dataStore';

import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
    <div id="outerContainer">
        <div class="app" id="mainContainer">
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
            
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                    <li><a href="#">Link</a></li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">One more separated link</a></li>
                      </ul>
                    </li>
                  </ul>
                  <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        
        
            <div id="dataStoreMainList" class=" col-md-3 col-sm-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        List of objects
                    </div>
                    <!--<form class="">
                       <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                       </div>
                        <!--button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                      </form>-->
                    <div class="list-group">
                      <div class="list-group-item"><input type="text" class="form-control" placeholder="Search for object"></div>
                      <a href="#" class="list-group-item active">Namespace-1</a>
                      <a href="#" class="list-group-item">Namespace-2</a>
                      <a href="#" class="list-group-item">Namespace-3</a>
                      <a href="#" class="list-group-item">Namespace-4</a>
                      <a href="#" class="list-group-item">Namespace-5</a>
                      <a href="#" class="list-group-item">Namespace-6</a>
                      <a href="#" class="list-group-item">Namespace-7</a>
                      <a href="#" class="list-group-item">Namespace-8</a>
                      <a href="#" class="list-group-item">Namespace-9</a>
                    </div>
                </div>
            </div>
            
            <div id="dataStoreInfo" class=" col-md-9 col-sm-9">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="col-lg-6 h4">
                        Content
                      </div>
                      <div class="pull-right">
                        <a href="edit.html" class="btn btn-primary">Edit mode</a> <button class="btn btn-danger buttonLeftAdjust">Delete object</button>
                      </div>
                    </div>
                  </div>
                  <div class="panel-body">
                    <div class="namespaceName">
                        Namespace-1
                    </div>
                    <hr>
                    <div class="JSONValues">
                        <div class="panel panel-default">
                            <div class="panel-heading">JSON value 1</div>
                            <div class="panel-body">value</div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">JSON value 2</div>
                            <div class="panel-body">value</div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">JSON value 3</div>
                            <div class="panel-body">value</div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
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