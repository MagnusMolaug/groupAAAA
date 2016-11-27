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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var AppComponent = (function () {
    //VARIABLES END
    function AppComponent(appService, http1) {
        var _this = this;
        this.appService = appService;
        this.http1 = http1;
        //VARIABLES START
        this.dataStore = [];
        this.searchableDataStore = ['No registered namespaces'];
        this.keyList = [];
        this.searchableKeyList = ['No namespace chosen'];
        this.JSONValuesList = [];
        this.JSONKeysList = [];
        this.stringValue = "";
        this.selectedKey = "No key selected";
        this.mode = "JSON";
        this.serverUrl = "";
        this.serverNamespace = "";
        //private settings;
        this.model = new dataStore_1.DataStore('', '', true);
        //let http1: Http;
        this.http1.get('manifest.webapp').map(function (res) { return res.json(); }).subscribe(function (manifest_data) {
            //console.log("a", JSON.stringify(manifest_data.activities.dhis.href));
            _this.serverUrl = manifest_data.activities.dhis.href;
            _this.serverNamespace = manifest_data.activities.dhis.namespace;
            console.log("a: ", manifest_data.activities.dhis.href);
            console.log("b: ", manifest_data.activities.dhis.namespace);
            _this.loadObjectList(_this.serverUrl, _this.serverNamespace);
        });
    }
    AppComponent.prototype.loadObjectList = function (url, namespace) {
        var _this = this;
        //Loads a list of all registered namespaces
        this.appService.setUrlAndNamespace(url, namespace);
        this.appService.getNamespaces().subscribe(function (res) { return _this.updateObjectList(res); });
    };
    AppComponent.prototype.updateObjectList = function (dataStore) {
        //updates variables of an object in the datastore.
        this.dataStore = [];
        for (var i = 0; i < dataStore.length; i++) {
            this.dataStore.push(dataStore[i]);
        }
        this.searchableDataStore = dataStore;
    };
    AppComponent.prototype.loadKeyList = function (namespace) {
        //Gets a namespace and sends the list to the update keys function
        var _this = this;
        document.getElementById("newKeyButton").style.visibility = 'visible';
        this.selectedNamespace = namespace;
        this.selectedKey = "No key selected";
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
        this.searchableKeyList = keyList;
    };
    AppComponent.prototype.loadJSONValues = function (key) {
        //Gets the JSON values from a key and pass them tu the update JSON list function
        var _this = this;
        this.selectedKey = key;
        this.appService.getJSONValues(this.selectedNamespace, key).subscribe(function (res) { return _this.updateJSONList(res); });
    };
    AppComponent.prototype.updateJSONList = function (JSONList) {
        //Updates the JSON values list to contain values given
        this.stringValue = "";
        this.mode = "EDIT";
        this.stringValue = JSON.stringify(JSONList, null, 4);
    };
    AppComponent.prototype.newKeyButton = function () {
        this.mode = "NEWKEY";
        this.selectedKey = "Add new key";
    };
    AppComponent.prototype.newKey = function () {
        //Create a new object and save it to the datastore.
        var keyName = document.getElementById("addKeyName").value;
        var keyValue = document.getElementById("addKeyValue").value;
        this.appService.newKey(this.selectedNamespace, keyName, keyValue)
            .subscribe(this.loadObjectList(this.serverUrl, this.serverNamespace));
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
            .subscribe(this.loadObjectList(this.serverUrl, this.serverNamespace));
        this.mode = "SAVED";
    };
    AppComponent.prototype.deleteKey = function () {
        //Delete a key from a namespace.
        this.appService.deleteKey(this.selectedNamespace, this.selectedKey)
            .subscribe(this.loadObjectList(this.serverUrl, this.serverNamespace));
        var index = this.keyList.indexOf(this.selectedKey, 0);
        if (index > -1) {
            this.keyList.splice(index, 1);
        }
        this.mode = "DELETED";
    };
    AppComponent.prototype.namespaceSearch = function () {
        this.searchableDataStore = this.dataStore;
        var searchNamespaceList = this.searchableDataStore;
        var namespaceSearch = document.getElementById("namespaceSearch").value;
        var temp = [];
        for (var i in searchNamespaceList) {
            if (namespaceSearch) {
                if ((searchNamespaceList[i].toLowerCase()).includes(namespaceSearch.toLowerCase())) {
                    temp.push(searchNamespaceList[i]);
                }
            }
            else {
                temp = this.dataStore;
            }
        }
        this.searchableDataStore = temp;
    };
    AppComponent.prototype.keySearch = function () {
        this.searchableKeyList = this.keyList;
        var searchKeyList = this.searchableKeyList;
        var keySearch = document.getElementById("keySearch").value;
        var temp = [];
        for (var i in searchKeyList) {
            if (keySearch) {
                if ((searchKeyList[i].toLowerCase()).includes(keySearch.toLowerCase())) {
                    temp.push(searchKeyList[i]);
                }
            }
            else {
                temp = this.keyList;
            }
        }
        this.searchableKeyList = temp;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div id=\"outerContainer\">\n        <div class=\"app\" id=\"mainContainer\">\n               \n            <h3>DataStore Manager Application</h3>\n        \n            <div id=\"dataStoreMainList\" class=\" col-md-3 col-sm-3\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">\n                        <div class=\"row\">\n                            <span class=\"col-lg-12 h4\">List of namespaces</span>\n                        </div>\n                    </div>\n                    <div class=\"list-group-item zeroBorder\">\n                        <input class=\"form-control\" type=\"text\" [ngModel]=\"searchModel\" id=\"namespaceSearch\" placeholder=\"Search for namespaces\" (ngModelChange)=\"namespaceSearch()\">\n                    </div>\n                    <div class=\"list-group namespaceList\">\n                        <div class=\"list-group-item ListObjects\" *ngFor=\"let unit of searchableDataStore;\" (click)=loadKeyList(unit)>{{unit}}</div>\n                    </div>\n                </div>\n            </div>\n\n            <div id=\"dataStoreKeyList\" class=\" col-md-3 col-sm-3\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">\n                        <div class=\"row\">\n                            <span class=\"col-lg-8 h4\">List of keys</span>\n                            <button class=\"btn btn-primary glyphicon glyphicon-plus buttonLeftAdjust\" id=\"newKeyButton\" style=\"float: right; visibility: hidden;\" (click)=newKeyButton()></button>\n                    \n                        </div>\n                    </div>\n                    <div class=\"list-group-item zeroBorder\">\n                        <input class=\"form-control\" type=\"text\" [ngModel]=\"searchModel2\" id=\"keySearch\" placeholder=\"Search for a key\" (ngModelChange)=\"keySearch()\">\n                    </div>\n                    <div class=\"list-group namespaceList\">\n                        <div></div>\n                        <div class=\"list-group-item ListObjects\" *ngFor=\"let unit of searchableKeyList;\" (click)=loadJSONValues(unit)>{{unit}}</div>\n                    </div>\n                </div>\n            </div>\n            \n            <div id=\"dataStoreInfo\" class=\" col-md-6 col-sm-6\">\n                <div class=\"panel panel-default\">\n                  <div class=\"panel-heading\">\n                    <div class=\"row\">\n                      <div class=\"col-lg-6 h4\">\n                        {{selectedKey}}\n                      </div>\n                      <div class=\"pull-right\">\n                        <!--<button class=\"btn btn-warning buttonLeftAdjust\" (click)=\"changeMode('RAW')\">Raw text</button>\n                        <button class=\"btn btn-primary buttonLeftAdjust\" (click)=\"changeMode('EDIT')\">Edit</button>\n                        <button class=\"btn btn-danger buttonLeftAdjust\">Delete</button>-->\n                        <div ngSwitch=\"{{mode}}\">\n                            <div *ngSwitchCase=\"'EDIT'\">\n                                <button class=\"btn btn-primary buttonLeftAdjust\" (click)=\"saveChanges()\">Save changes</button>\n                                <button class=\"btn btn-warning buttonLeftAdjust\" (click)=\"cancelEdit()\">Cancel</button>\n                                <button class=\"btn btn-danger buttonLeftAdjust\" (click)=\"deleteKey()\">Delete key</button>\n                            </div>\n                            <div *ngSwitchCase=\"'NEWKEY'\">\n                                <button class=\"btn btn-danger buttonLeftAdjust\" (click)=\"cancelEdit()\">Cancel</button>\n                                <button class=\"btn btn-primary buttonLeftAdjust\" (click)=\"newKey()\">Save key</button>\n                            </div>\n                            <div *ngSwitchDefault>\n                            \n                            </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"panel-body\" ngSwitch=\"{{mode}}\">\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'NEWKEY'\">\n                        <div class=\"panel-heading\">\n                            <div class=\"row\">\n                                <div class=\"col-lg-12\">\n                                    <input id=\"addKeyName\" class=\"form-control\" placeholder=\"Key Name\"/>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"panel-body\">\n                            <div class=\"row\">\n                                <div class=\"col-lg-12 JSONBox\">\n                                    <textarea id=\"addKeyValue\" class=\"fullSize zeroBorder\">{\n    \"label\":\"value\"\n}</textarea><!--Default values for new JSON key-->\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"JSONValues JSONBox\" id=\"JSONValues\" *ngSwitchCase=\"'EDIT'\">\n                        <textarea id=\"editTextArea\" class=\"fullSize zeroBorder\">{{stringValue}}</textarea>\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'SAVED'\">\n                        Changes Saved\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'DELETED'\">\n                        Key Deleted\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchDefault>\n                    \n                    </div>\n                  </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div>\n</div>\n    \n"
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map