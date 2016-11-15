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
                    <div class="list-group-item"><input type="text" class="form-control" placeholder="Search for an object"></div>
                    <div class="list-group namespaceList">
                        <div class="list-group-item ListObjects" *ngFor="let unit of dataStore;" (click)=loadKeyList(unit)>{{unit}}</div>
                    </div>
                </div>
            </div>

            <div id="dataStoreKeyList" class=" col-md-3 col-sm-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        List of keys
                    </div>
                    <div class="list-group-item"><input type="text" class="form-control" placeholder="Search for a key"></div>
                    <div class="list-group namespaceList">
                        <div class="list-group-item ListObjects" *ngFor="let unit of keyList;" (click)=loadJSONValues(unit)>{{unit}}</div>
                    </div>
                </div>
            </div>
            
            <div id="dataStoreInfo" class=" col-md-6 col-sm-6">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="col-lg-6 h4">
                        Key: {{this.selectedKey}}
                      </div>
                      <div class="pull-right">
                        <a href="edit.html" class="btn btn-primary">Edit mode</a> <button class="btn btn-danger buttonLeftAdjust">Delete object</button>
                      </div>
                    </div>
                  </div>
                  <div class="panel-body">
                    <div class="JSONValues">
                        <div class="panel panel-default" *ngFor="let unit of JSONValuesList;">
                            <div class="panel-heading">{{unit}}</div>
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

    public dataStore = [];
    public keyList = ['No namespace chosen'];
    public JSONValuesList : JSON;

    public selectedNamespace;
    public selectedKey = "-";

    private dataStores;
    //private settings;

    model = new DataStore('', '', true);

    //VARIABLES END

    constructor(
        private appService: AppService
    ) { this.loadObjectList() }

    loadObjectList(): void {
        //Loads a list of all registered namespaces

        this.appService.getNamespaces().subscribe(res => this.updateObjectList(res));
    }

    updateObjectList( dataStore ): void {
        //updates variables of an object in the datastore.

        this.dataStore = [];
        for(let i = 0; i < dataStore.length; i++){
            this.dataStore.push(dataStore[i]);
        }
    }

    loadKeyList( namespace ): void{
        //Gets a namespace and sends the list to the update keys function

        this.selectedNamespace = namespace
        this.appService.getNamespaceKeys(namespace).subscribe(res => this.updateKeyList(res));
    }

    updateKeyList( keyList ): void{
        //Updates all the keys in the key list to correspond to the selected namespace

        this.keyList = [];
        for(let i = 0; i < keyList.length; i++){
            this.keyList.push(keyList[i]);
        }
        console.log(this.keyList);
    }

    loadJSONValues( key ): void{
        //Gets the JSON values from a key and pass them tu the update JSON list function

        this.appService.getJSONValues(this.selectedNamespace, key).subscribe(res => this.updateJSONList(res));
        this.selectedKey = key;
    }

    updateJSONList( JSONList ): void{
        //Updates the JSON values list to contain values given

        this.JSONValuesList = null;
        console.log(JSONList);
        /*for(let i = 0; i < JSONList.length; i++){
            this.JSONValuesList.push(JSONList[i]);
        }*/
        this.JSONValuesList = JSONList;
        console.log(this.JSONValuesList);
    }

    newDataStore(): void {
        //Create a new object and save it to the datastore.

        this.appService.saveDataStoreObject(this.model)
            .subscribe(this.loadObjectList())
    }

    deleteObject(event): void {
        //Delete an object fromm the datastore.
    }

}