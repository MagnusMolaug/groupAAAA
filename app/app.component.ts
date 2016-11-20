import { Component } from '@angular/core';
import { AppService } from './app.service';
import { DataStore } from './dataStore';

import 'rxjs/Rx';


@Component({
    selector: 'my-app',
    template: `
    <div id="outerContainer">
        <div class="app" id="mainContainer">
        
        <!--NAVBAR-->
            <!--nav-- class="navbar navbar-default">
              <div class="container-fluid">
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
            </nav-->
            <!--NAVBAR-->
            <h1>DataStore Manager Application</h1>
        
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
                    <div class="panel-heading h4">
                        List of keys
                        <button class="btn btn-success" style="float: right" (click)=newKeyButton()>Add</button>
                    </div>
                    <div class="list-group-item"><input type="text" class="form-control" placeholder="Search for a key"></div>
                    <div class="list-group namespaceList">
                        <div></div>
                        <div class="list-group-item ListObjects" *ngFor="let unit of keyList;" (click)=loadJSONValues(unit)>{{unit}}</div>
                    </div>
                </div>
            </div>
            
            <div id="dataStoreInfo" class=" col-md-6 col-sm-6">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="col-lg-6 h4">
                        {{selectedKey}}
                      </div>
                      <div class="pull-right">
                        <!--<button class="btn btn-warning buttonLeftAdjust" (click)="changeMode('RAW')">Raw text</button>
                        <button class="btn btn-primary buttonLeftAdjust" (click)="changeMode('EDIT')">Edit</button>
                        <button class="btn btn-danger buttonLeftAdjust">Delete</button>-->
                        <button class="btn btn-danger buttonLeftAdjust">Cancel</button>
                        <button class="btn btn-primary buttonLeftAdjust">Save changes</button>
                      </div>
                    </div>
                  </div>
                  <div class="panel-body" ngSwitch="{{mode}}">
                    <div class="JSONValues" id="JSONValues" *ngSwitchCase="'JSONEDIT'">
                        <div class="panel panel-default" *ngFor="let unit of JSONKeysList; let i=index">
                          <div class="panel-heading">
                            <div class="row">
                              <div class="col-lg-10">
                                <input class="form-control maxInputWidth" value="{{unit}}"/>
                              </div>
                            </div>
                          </div>
                          <div class="panel-body">
                            <div class="row">
                              <div class="col-lg-10">
                                <input class="form-control" value="{{JSONValuesList[i]}}"/>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="JSONValues" id="JSONValues" *ngSwitchCase="'JSON'">
                        <div class="panel panel-default" *ngFor="let unit of JSONKeysList; let i=index">
                            <div class="panel-heading">{{unit}}</div>
                            <div class="panel-body">{{JSONValuesList[i]}}</div>
                        </div>
                    </div>
                    <div class="JSONValues" id="JSONValues" *ngSwitchCase="'RAWEDIT'">
                        <div contenteditable="true" >{{stringValue}}</div>
                    </div>
                    <div class="JSONValues" id="JSONValues" *ngSwitchCase="'NEWKEY'">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-lg-10">
                                    <input id="addKeyName" class="form-control" placeholder="Key Name"/>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-10">
                                    <input id="addKeyValue" class="form-control" placeholder="Values"/>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-success" (click)="newKey()">Save</button>
                    </div>
                    <div class="JSONValues" id="JSONValues" *ngSwitchDefault>
                        <textarea class="fullSize">{{stringValue}}</textarea>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <div>
    <!--
    TODO list
    -distinguish between plain text and JSON (scan for c-brackets)
    Make raw text mode 
    add support for parsing nested json objects
    
    LATER
    Make statistics page
    Make history page
    Upload to DHIS2 and make a namespace
    Save changes to keys
    Save history of changes-->
</div>
    
`
})
export class AppComponent {

    //VARIABLES START

    public dataStore = ['No registered namespaces'];
    public keyList = ['No namespace chosen'];
    public JSONValuesList = [];
    public JSONKeysList = [];
    public stringValue = "";

    public selectedNamespace;
    public selectedKey = "No key selected";

    public mode = "JSON";

    //private settings;

    model = new DataStore('', '', true);

    //VARIABLES END

    constructor(
        private appService: AppService
    ) { this.loadObjectList() }

    changeMode( newMode: string ): void {
        //Changes the mode between edit and view

        if(newMode == 'RAW') {
            this.mode = 'RAWEDIT';
        }
        else if(newMode == 'EDIT'){

            switch( this.mode ){
                case 'JSON': this.mode = 'JSONEDIT';
                    break;
                case 'RAW': this.mode = 'RAWEDIT';
                    break;
                case 'JSONEDIT': this.mode = 'JSON';
                    break;
                case 'RAWEDIT': this.mode = 'RAW';
                    break;
            }
        }

        return;
    }

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

        this.selectedNamespace = namespace;
        this.JSONKeysList = [];
        this.JSONValuesList = [];
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

        this.selectedKey = "Key: " + key;
        this.appService.getJSONValues(this.selectedNamespace, key).subscribe(res => this.updateJSONList(res));
    }

    updateJSONList( JSONList ): void{
        //Updates the JSON values list to contain values given

        /*this.JSONKeysList = [];
        this.JSONValuesList = [];*/
        this.stringValue = "";

        /*if(typeof JSONList == "string"){
            this.stringValue = JSONList;
            this.mode = "RAW";
            console.log(JSONList);
        }
        else{
            this.mode = "RAWJSON";
            this.stringValue = JSON.stringify(JSONList);

            for(var keyName in JSONList){
                var value= JSONList[keyName ];
                this.JSONKeysList.push(keyName);
                this.JSONValuesList.push(JSON.stringify(value));
            }
        }*/
        this.mode = "RAWJSON";
        this.stringValue = JSON.stringify(JSONList, null, 4);
        console.log(this.stringValue);
    }

    newKeyButton(): void{
        this.mode = "NEWKEY";
        this.selectedKey = "Add new key";
    }

    newKey(): void {
        //Create a new object and save it to the datastore.

        var keyName = (<HTMLInputElement>document.getElementById("addKeyName")).value;
        var keyValue = (<HTMLInputElement>document.getElementById("addKeyValue")).value;

        console.log(keyName);
        console.log(keyValue);
        this.appService.newKey(this.selectedNamespace, keyName, keyValue)
            .subscribe(this.loadObjectList())
    }

    deleteObject(event): void {
        //Delete an object fromm the datastore.
    }

}