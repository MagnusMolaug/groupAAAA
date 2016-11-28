import { Component } from '@angular/core';
import { AppService } from './app.service';
import { DataStore } from './dataStore';
import {Headers, Http} from '@angular/http';

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
                        <div class="row">
                            <span class="col-lg-12 h4">List of namespaces</span>
                        </div>
                    </div>
                    <div class="list-group-item zeroBorder">
                        <input class="form-control" type="text" [ngModel]="searchModel" id="namespaceSearch" placeholder="Search for namespaces" (ngModelChange)="namespaceSearch()">
                    </div>
                    <div class="list-group namespaceList">
                        <div class="list-group-item ListObjects" *ngFor="let unit of searchableDataStore;" (click)=loadKeyList(unit)>{{unit}}</div>
                    </div>
                </div>
            </div>

            <div id="dataStoreKeyList" class=" col-md-3 col-sm-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row">
                            <span class="col-lg-8 h4">List of keys</span>
                            <button class="btn btn-primary glyphicon glyphicon-plus buttonLeftAdjust" id="newKeyButton" style="float: right; visibility: hidden;" (click)=newKeyButton()></button>
                    
                        </div>
                    </div>
                    <div class="list-group-item zeroBorder">
                        <input class="form-control" type="text" [ngModel]="searchModel2" id="keySearch" placeholder="Search for a key" (ngModelChange)="keySearch()">
                    </div>
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
                                <div class="col-lg-12 JSONBox">
                                    <textarea id="addKeyValue" class="fullSize zeroBorder">{
    "label":"value"
}</textarea><!--Default values for new JSON key-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="JSONValues JSONBox" id="JSONValues" *ngSwitchCase="'EDIT'">
                        <textarea id="editTextArea" class="fullSize zeroBorder">{{stringValue}}</textarea>
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

    public serverUrl = "";
    public serverNamespace = "";
    //private settings;

    model = new DataStore('', '', true);

    //VARIABLES END

    constructor(private appService: AppService, private http1: Http) {
        //let http1: Http;
        this.http1.get('manifest.webapp').map(res => res.json()).subscribe((manifest_data) => {
            //console.log("a", JSON.stringify(manifest_data.activities.dhis.href));
            this.serverUrl = manifest_data.activities.dhis.href;
            this.serverNamespace = manifest_data.activities.dhis.namespace;
            console.log("a: ",manifest_data.activities.dhis.href);
            console.log("b: ",manifest_data.activities.dhis.namespace);
            this.loadObjectList(this.serverUrl, this.serverNamespace);
        });

    }

    loadObjectList(url: string, namespace: string): void {
        //Loads a list of all registered namespaces
        this.appService.setUrlAndNamespace(url, namespace);
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

        this.stringValue = "";
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
            .subscribe(this.loadObjectList(this.serverUrl, this.serverNamespace))

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
            .subscribe(this.loadObjectList(this.serverUrl, this.serverNamespace))

        this.mode = "SAVED";
    }

    deleteKey(): void {
        //Delete a key from a namespace.

        this.appService.deleteKey(this.selectedNamespace, this.selectedKey)
            .subscribe(this.loadObjectList(this.serverUrl, this.serverNamespace))

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