"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var app_service_1 = require('./app.service');
var dataStore_1 = require('./dataStore');
require('rxjs/Rx');
var AppComponent = (function () {
    //VARIABLES END
    function AppComponent(appService) {
        this.appService = appService;
        //VARIABLES START
        this.dataStore = ['No registered namespaces'];
        this.keyList = ['No namespace chosen'];
        this.JSONValuesList = [];
        this.JSONKeysList = [];
        this.stringValue = "";
        this.selectedKey = "No key selected";
        this.mode = "JSON";
        //private settings;
        this.model = new dataStore_1.DataStore('', '', true);
        this.loadObjectList();
    }
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
    AppComponent.prototype.loadObjectList = function () {
        //Loads a list of all registered namespaces
        var _this = this;
        this.appService.getNamespaces().subscribe(function (res) { return _this.updateObjectList(res); });
    };
    AppComponent.prototype.updateObjectList = function (dataStore) {
        //updates variables of an object in the datastore.
        this.dataStore = [];
        for (var i = 0; i < dataStore.length; i++) {
            this.dataStore.push(dataStore[i]);
        }
    };
    AppComponent.prototype.loadKeyList = function (namespace) {
        //Gets a namespace and sends the list to the update keys function
        var _this = this;
        document.getElementById("newKeyButton").style.visibility = 'visible';
        this.selectedNamespace = namespace;
        this.JSONKeysList = [];
        this.JSONValuesList = [];
        this.mode = "NONE";
        this.appService.getNamespaceKeys(namespace).subscribe(function (res) { return _this.updateKeyList(res); });
    };
    AppComponent.prototype.updateKeyList = function (keyList) {
        //Updates all the keys in the key list to correspond to the selected namespace
        this.keyList = [];
        for (var i = 0; i < keyList.length; i++) {
            this.keyList.push(keyList[i]);
        }
        console.log(this.keyList);
    };
    AppComponent.prototype.loadJSONValues = function (key) {
        //Gets the JSON values from a key and pass them tu the update JSON list function
        var _this = this;
        this.selectedKey = key;
        this.appService.getJSONValues(this.selectedNamespace, key).subscribe(function (res) { return _this.updateJSONList(res); });
    };
    AppComponent.prototype.updateJSONList = function (JSONList) {
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
        console.log(this.stringValue);
    };
    AppComponent.prototype.newKeyButton = function () {
        this.mode = "NEWKEY";
        this.selectedKey = "Add new key";
    };
    AppComponent.prototype.newKey = function () {
        //Create a new object and save it to the datastore.
        var keyName = document.getElementById("addKeyName").value;
        var keyValue = document.getElementById("addKeyValue").value;
        console.log(keyName);
        console.log(keyValue);
        this.appService.newKey(this.selectedNamespace, keyName, keyValue)
            .subscribe(this.loadObjectList());
        this.keyList[this.keyList.length] = keyName;
        this.mode = "SAVED";
    };
    AppComponent.prototype.cancelEdit = function () {
        this.selectedKey = "No key selected";
        this.stringValue = "";
        this.JSONValuesList = [];
        this.JSONKeysList = [];
        this.mode = "NONE";
    };
    AppComponent.prototype.saveChanges = function () {
        //Saves all changes done to a key
        var content = document.getElementById("editTextArea").value;
        this.appService.saveChanges(this.selectedNamespace, this.selectedKey, content)
            .subscribe(this.loadObjectList());
        this.mode = "SAVED";
    };
    AppComponent.prototype.deleteKey = function () {
        //Delete a key from a namespace.
        this.appService.deleteKey(this.selectedNamespace, this.selectedKey)
            .subscribe(this.loadObjectList());
        var index = this.keyList.indexOf(this.selectedKey, 0);
        if (index > -1) {
            this.keyList.splice(index, 1);
        }
        this.mode = "DELETED";
    };
    AppComponent.prototype.namespaceSearch = function () {
        console.log("change");
        var searchNamespaceList = this.dataStore;
        var namespaceSearch = document.getElementById("namespaceSearch").value;
        namespaceSearch = "/" + namespaceSearch + "/";
        for (var i in searchNamespaceList) {
            if (searchNamespaceList[i].search(namespaceSearch) != -1) {
                console.log(i);
                console.log(searchNamespaceList[i]);
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div id=\"outerContainer\">\n        <div class=\"app\" id=\"mainContainer\">\n               \n            <h3>DataStore Manager Application</h3>\n        \n            <div id=\"dataStoreMainList\" class=\" col-md-3 col-sm-3\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">\n                        List of objects\n                    </div>\n                    <div class=\"list-group-item\"><input type=\"text\" [ngModel]=\"searchModel\" id=\"namespaceSearch\" class=\"form-control\" placeholder=\"Search for an object\" (ngModelChange)=\"namespaceSearch()\"></div>\n                    <div class=\"list-group namespaceList\">\n                        <div class=\"list-group-item ListObjects\" *ngFor=\"let unit of dataStore;\" (click)=loadKeyList(unit)>{{unit}}</div>\n                    </div>\n                </div>\n            </div>\n\n            <div id=\"dataStoreKeyList\" class=\" col-md-3 col-sm-3\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading h4\">\n                        List of keys\n                        <button class=\"glyphicon glyphicon-plus\" id=\"newKeyButton\" style=\"float: right; visibility: hidden;\" (click)=newKeyButton()></button>\n                    </div>\n                    <div class=\"list-group-item\"><input type=\"text\" class=\"form-control\" placeholder=\"Search for a key\"></div>\n                    <div class=\"list-group namespaceList\">\n                        <div></div>\n                        <div class=\"list-group-item ListObjects\" *ngFor=\"let unit of keyList;\" (click)=loadJSONValues(unit)>{{unit}}</div>\n                    </div>\n                </div>\n            </div>\n            \n            <div id=\"dataStoreInfo\" class=\" col-md-6 col-sm-6\">\n                <div class=\"panel panel-default\">\n                  <div class=\"panel-heading\">\n                    <div class=\"row\">\n                      <div class=\"col-lg-6 h4\">\n                        {{selectedKey}}\n                      </div>\n                      <div class=\"pull-right\">\n                        <!--<button class=\"btn btn-warning buttonLeftAdjust\" (click)=\"changeMode('RAW')\">Raw text</button>\n                        <button class=\"btn btn-primary buttonLeftAdjust\" (click)=\"changeMode('EDIT')\">Edit</button>\n                        <button class=\"btn btn-danger buttonLeftAdjust\">Delete</button>-->\n                        <div ngSwitch=\"{{mode}}\">\n                            <div *ngSwitchCase=\"'EDIT'\">\n                                <button class=\"btn btn-primary buttonLeftAdjust\" (click)=\"saveChanges()\">Save changes</button>\n                                <button class=\"btn btn-warning buttonLeftAdjust\" (click)=\"cancelEdit()\">Cancel</button>\n                                <button class=\"btn btn-danger buttonLeftAdjust\" (click)=\"deleteKey()\">Delete key</button>\n                            </div>\n                            <div *ngSwitchCase=\"'NEWKEY'\">\n                                <button class=\"btn btn-danger buttonLeftAdjust\" (click)=\"cancelEdit()\">Cancel</button>\n                                <button class=\"btn btn-primary buttonLeftAdjust\" (click)=\"newKey()\">Save key</button>\n                            </div>\n                            <div *ngSwitchDefault>\n                            \n                            </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"panel-body\" ngSwitch=\"{{mode}}\">\n                    <!--div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'JSONEDIT'\">\n                        <div class=\"panel panel-default\" *ngFor=\"let unit of JSONKeysList; let i=index\">\n                          <div class=\"panel-heading\">\n                            <div class=\"row\">\n                              <div class=\"col-lg-10\">\n                                <input class=\"form-control maxInputWidth\" value=\"{{unit}}\"/>\n                              </div>\n                            </div>\n                          </div>\n                          <div class=\"panel-body\">\n                            <div class=\"row\">\n                              <div class=\"col-lg-10\">\n                                <input class=\"form-control\" value=\"{{JSONValuesList[i]}}\"/>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'JSON'\">\n                        <div class=\"panel panel-default\" *ngFor=\"let unit of JSONKeysList; let i=index\">\n                            <div class=\"panel-heading\">{{unit}}</div>\n                            <div class=\"panel-body\">{{JSONValuesList[i]}}</div>\n                        </div>\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'RAWEDIT'\">\n                        <div contenteditable=\"true\" >{{stringValue}}</div>\n                    </div-->\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'NEWKEY'\">\n                        <div class=\"panel-heading\">\n                            <div class=\"row\">\n                                <div class=\"col-lg-12\">\n                                    <input id=\"addKeyName\" class=\"form-control\" placeholder=\"Key Name\"/>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"panel-body\">\n                            <div class=\"row\">\n                                <div class=\"col-lg-12\">\n                                    <textarea id=\"addKeyValue\" class=\"fullSize\" placeholder=\"Key Value\"></textarea>\n                                    <!--/input id=\"addKeyValue\" class=\"form-control\" placeholder=\"Values\"/-->\n                                </div>\n                            </div>\n                        </div>\n                        <!--button class=\"btn btn-success\" (click)=\"newKey()\">Save</button-->\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'EDIT'\">\n                        <textarea id=\"editTextArea\" class=\"fullSize\">{{stringValue}}</textarea>\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'SAVED'\">\n                        Changes Saved\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'DELETED'\">\n                        Key Deleted\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchDefault>\n                    \n                    </div>\n                  </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div>\n    <!--\n    TODO list\n    -distinguish between plain text and JSON (scan for c-brackets)\n    Make raw text mode \n    add support for parsing nested json objects\n    \n    LATER\n    Make statistics page\n    Make history page\n    Upload to DHIS2 and make a namespace\n    Save changes to keys\n    Save history of changes-->\n</div>\n    \n"
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map