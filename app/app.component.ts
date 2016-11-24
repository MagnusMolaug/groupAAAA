import { Component } from '@angular/core';
import { AppService } from './app.service';
import { DataStore } from './dataStore';

import 'rxjs/Rx';


@Component({
    selector: 'my-app',
    template: `
    <div id="outerContainer">
        <div class="app" id="mainContainer">
               
            <h3>DataStore Manager Application</h3>
        
            <div id="dataStoreMainList" class=" col-md-3 col-sm-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        List of namespaces
                    </div>
                    <div class="list-group-item"><input type="text" [ngModel]="searchModel" id="namespaceSearch" class="form-control" placeholder="Search for namespaces" (ngModelChange)="namespaceSearch()"></div>
                    <div class="list-group namespaceList">
                        <div class="list-group-item ListObjects" *ngFor="let unit of searchableDataStore;" (click)=loadKeyList(unit)>{{unit}}</div>
                    </div>
                </div>
            </div>

            <div id="dataStoreKeyList" class=" col-md-3 col-sm-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        List of keys
                        <button class="glyphicon glyphicon-plus" id="newKeyButton" style="float: right; visibility: hidden;" (click)=newKeyButton()></button>
                    </div>
                    <div class="list-group-item"><input type="text" [ngModel]="searchModel2" id="keySearch" class="form-control" placeholder="Search for a key" (ngModelChange)="keySearch()"></div>
                    <div class="list-group namespaceList">
                        <div></div>
                        <div class="list-group-item ListObjects" *ngFor="let unit of searchableKeyList;" (click)=loadJSONValues(unit)>{{unit}}</div>
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
                        <div ngSwitch="{{mode}}">
                            <div *ngSwitchCase="'EDIT'">
                                <button class="btn btn-primary buttonLeftAdjust" (click)="saveChanges()">Save changes</button>
                                <button class="btn btn-warning buttonLeftAdjust" (click)="cancelEdit()">Cancel</button>
                                <button class="btn btn-danger buttonLeftAdjust" (click)="deleteKey()">Delete key</button>
                            </div>
                            <div *ngSwitchCase="'NEWKEY'">
                                <button class="btn btn-danger buttonLeftAdjust" (click)="cancelEdit()">Cancel</button>
                                <button class="btn btn-primary buttonLeftAdjust" (click)="newKey()">Save key</button>
                            </div>
                            <div *ngSwitchDefault>
                            
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="panel-body" ngSwitch="{{mode}}">
                    <!--div class="JSONValues" id="JSONValues" *ngSwitchCase="'JSONEDIT'">
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
                    </div-->
                    <div class="JSONValues" id="JSONValues" *ngSwitchCase="'NEWKEY'">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-lg-12">
                                    <input id="addKeyName" class="form-control" placeholder="Key Name"/>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <textarea id="addKeyValue" class="fullSize" placeholder="Key Value"></textarea>
                                    <!--/input id="addKeyValue" class="form-control" placeholder="Values"/-->
                                </div>
                            </div>
                        </div>
                        <!--button class="btn btn-success" (click)="newKey()">Save</button-->
                    </div>
                    <div class="JSONValues" id="JSONValues" *ngSwitchCase="'EDIT'">
                        <textarea id="editTextArea" class="fullSize">{{stringValue}}</textarea>
                    </div>
                    <div class="JSONValues" id="JSONValues" *ngSwitchCase="'SAVED'">
                        Changes Saved
                    </div>
                    <div class="JSONValues" id="JSONValues" *ngSwitchCase="'DELETED'">
                        Key Deleted
                    </div>
                    <div class="JSONValues" id="JSONValues" *ngSwitchDefault>
                    
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

    public dataStore = [];
    public searchableDataStore = ['No registered namespaces'];
    public keyList = [];
    public searchableKeyList = ['No namespace chosen'];
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

    /*changeMode( newMode: string ): void {
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
    }*/

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
        this.searchableDataStore = dataStore;
    }

    loadKeyList( namespace ): void{
        //Gets a namespace and sends the list to the update keys function

        document.getElementById("newKeyButton").style.visibility='visible';

        this.selectedNamespace = namespace;
        this.selectedKey = "No key selected";
        this.JSONKeysList = [];
        this.JSONValuesList = [];
        this.mode = "NONE";
        this.appService.getNamespaceKeys(namespace).subscribe(res => this.updateKeyList(res));
    }

    updateKeyList( keyList ): void{
        //Updates all the keys in the key list to correspond to the selected namespace

        this.keyList = [];
        for(let i = 0; i < keyList.length; i++){
            this.keyList.push(keyList[i]);
        }
        this.searchableKeyList = keyList;
    }

    loadJSONValues( key ): void{
        //Gets the JSON values from a key and pass them tu the update JSON list function

        this.selectedKey = key;
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
        this.mode = "EDIT";
        this.stringValue = JSON.stringify(JSONList, null, 4);
    }

    newKeyButton(): void{
        this.mode = "NEWKEY";
        this.selectedKey = "Add new key";
    }

    newKey(): void {
        //Create a new object and save it to the datastore.

        var keyName = (<HTMLInputElement>document.getElementById("addKeyName")).value;
        var keyValue = (<HTMLInputElement>document.getElementById("addKeyValue")).value;

        this.appService.newKey(this.selectedNamespace, keyName, keyValue)
            .subscribe(this.loadObjectList())

        this.keyList[this.keyList.length] = keyName;

        this.mode = "SAVED";
    }

    cancelEdit(): void{
        this.selectedKey = "No key selected";
        this.stringValue = "";
        this.JSONValuesList = [];
        this.JSONKeysList = [];
        this.mode = "NONE";
    }

    saveChanges(): void{
        //Saves all changes done to a key

        var content = (<HTMLInputElement>document.getElementById("editTextArea")).value;

        this.appService.saveChanges(this.selectedNamespace, this.selectedKey, content)
            .subscribe(this.loadObjectList())

        this.mode = "SAVED";
    }

    deleteKey(): void {
        //Delete a key from a namespace.

        this.appService.deleteKey(this.selectedNamespace, this.selectedKey)
            .subscribe(this.loadObjectList())

        var index = this.keyList.indexOf(this.selectedKey, 0);
        if (index > -1) {
            this.keyList.splice(index, 1);
        }

        this.mode = "DELETED";
    }


    namespaceSearch(): void{
        this.searchableDataStore = this.dataStore;
        let searchNamespaceList = this.searchableDataStore;
        let namespaceSearch = (<HTMLInputElement>document.getElementById("namespaceSearch")).value;
        var temp = [];

        for(let i in searchNamespaceList){
            if(namespaceSearch){
                if((searchNamespaceList[i].toLowerCase()).includes(namespaceSearch.toLowerCase())){
                    temp.push(searchNamespaceList[i]);
                }
            }
            else {
                temp = this.dataStore;
            }
        }
        this.searchableDataStore = temp;
    }

    keySearch(): void{
        this.searchableKeyList = this.keyList;
        let searchKeyList = this.searchableKeyList;
        let keySearch = (<HTMLInputElement>document.getElementById("keySearch")).value;
        var temp = [];

        for(let i in searchKeyList){
            if(keySearch){
                if((searchKeyList[i].toLowerCase()).includes(keySearch.toLowerCase())){
                    temp.push(searchKeyList[i]);
                }
            }
            else {
                temp = this.keyList;
            }
        }
        this.searchableKeyList = temp;
    }

}