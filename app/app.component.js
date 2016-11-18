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
    AppComponent.prototype.changeMode = function (newMode) {
        //Changes the mode between edit and view
        if (newMode == 'RAW') {
            this.mode = 'RAWEDIT';
        }
        else if (newMode == 'EDIT') {
            switch (this.mode) {
                case 'JSON':
                    this.mode = 'JSONEDIT';
                    break;
                case 'RAW':
                    this.mode = 'RAWEDIT';
                    break;
                case 'JSONEDIT':
                    this.mode = 'JSON';
                    break;
                case 'RAWEDIT':
                    this.mode = 'RAW';
                    break;
            }
        }
        return;
    };
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
        this.selectedNamespace = namespace;
        this.JSONKeysList = [];
        this.JSONValuesList = [];
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
        this.selectedKey = "Key: " + key;
        this.appService.getJSONValues(this.selectedNamespace, key).subscribe(function (res) { return _this.updateJSONList(res); });
    };
    AppComponent.prototype.updateJSONList = function (JSONList) {
        //Updates the JSON values list to contain values given
        this.JSONKeysList = [];
        this.JSONValuesList = [];
        this.stringValue = "";
        if (typeof JSONList == "string") {
            this.stringValue = JSONList;
            this.mode = "RAW";
            console.log(JSONList);
        }
        else {
            this.mode = "RAWJSON";
            this.stringValue = JSON.stringify(JSONList);
            for (var keyName in JSONList) {
                var value = JSONList[keyName];
                this.JSONKeysList.push(keyName);
                this.JSONValuesList.push(JSON.stringify(value));
            }
        }
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
    };
    AppComponent.prototype.deleteObject = function (event) {
        //Delete an object fromm the datastore.
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div id=\"outerContainer\">\n        <div class=\"app\" id=\"mainContainer\">\n        \n        <!--NAVBAR-->\n            <!--nav-- class=\"navbar navbar-default\">\n              <div class=\"container-fluid\">\n                <div class=\"navbar-header\">\n                  <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                  </button>\n                  <a class=\"navbar-brand\" href=\"#\">Brand</a>\n                </div>\n            \n                <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                  <ul class=\"nav navbar-nav\">\n                    <li class=\"active\"><a href=\"#\">Link <span class=\"sr-only\">(current)</span></a></li>\n                    <li><a href=\"#\">Link</a></li>\n                    <li class=\"dropdown\">\n                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n                      <ul class=\"dropdown-menu\">\n                        <li><a href=\"#\">Action</a></li>\n                        <li><a href=\"#\">Another action</a></li>\n                        <li><a href=\"#\">Something else here</a></li>\n                        <li role=\"separator\" class=\"divider\"></li>\n                        <li><a href=\"#\">Separated link</a></li>\n                        <li role=\"separator\" class=\"divider\"></li>\n                        <li><a href=\"#\">One more separated link</a></li>\n                      </ul>\n                    </li>\n                  </ul>\n                  <ul class=\"nav navbar-nav navbar-right\">\n                    <li><a href=\"#\">Link</a></li>\n                    <li class=\"dropdown\">\n                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n                      <ul class=\"dropdown-menu\">\n                        <li><a href=\"#\">Action</a></li>\n                        <li><a href=\"#\">Another action</a></li>\n                        <li><a href=\"#\">Something else here</a></li>\n                        <li role=\"separator\" class=\"divider\"></li>\n                        <li><a href=\"#\">Separated link</a></li>\n                      </ul>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </nav-->\n            <!--NAVBAR-->\n        \n        \n            <div id=\"dataStoreMainList\" class=\" col-md-3 col-sm-3\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">\n                        List of objects\n                    </div>\n                    <div class=\"list-group-item\"><input type=\"text\" class=\"form-control\" placeholder=\"Search for an object\"></div>\n                    <div class=\"list-group namespaceList\">\n                        <div class=\"list-group-item ListObjects\" *ngFor=\"let unit of dataStore;\" (click)=loadKeyList(unit)>{{unit}}</div>\n                    </div>\n                </div>\n            </div>\n\n            <div id=\"dataStoreKeyList\" class=\" col-md-3 col-sm-3\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">\n                        List of keys\n                        <button class=\"btn btn-success\" style=\"float: right\" (click)=newKeyButton()>Add</button>\n                    </div>\n                    <div class=\"list-group-item\"><input type=\"text\" class=\"form-control\" placeholder=\"Search for a key\"></div>\n                    <div class=\"list-group namespaceList\">\n                        <div></div>\n                        <div class=\"list-group-item ListObjects\" *ngFor=\"let unit of keyList;\" (click)=loadJSONValues(unit)>{{unit}}</div>\n                    </div>\n                </div>\n            </div>\n            \n            <div id=\"dataStoreInfo\" class=\" col-md-6 col-sm-6\">\n                <div class=\"panel panel-default\">\n                  <div class=\"panel-heading\">\n                    <div class=\"row\">\n                      <div class=\"col-lg-6 h4\">\n                        {{selectedKey}}\n                      </div>\n                      <div class=\"pull-right\">\n                        <button class=\"btn btn-warning buttonLeftAdjust\" (click)=\"changeMode('RAW')\">Raw text</button>\n                        <button class=\"btn btn-primary buttonLeftAdjust\" (click)=\"changeMode('EDIT')\">Edit</button>\n                        <button class=\"btn btn-danger buttonLeftAdjust\">Delete</button>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"panel-body\" ngSwitch=\"{{mode}}\">\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'JSONEDIT'\">\n                        <div class=\"panel panel-default\" *ngFor=\"let unit of JSONKeysList; let i=index\">\n                          <div class=\"panel-heading\">\n                            <div class=\"row\">\n                              <div class=\"col-lg-10\">\n                                <input class=\"form-control maxInputWidth\" value=\"{{unit}}\"/>\n                              </div>\n                            </div>\n                          </div>\n                          <div class=\"panel-body\">\n                            <div class=\"row\">\n                              <div class=\"col-lg-10\">\n                                <input class=\"form-control\" value=\"{{JSONValuesList[i]}}\"/>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'JSON'\">\n                        <div class=\"panel panel-default\" *ngFor=\"let unit of JSONKeysList; let i=index\">\n                            <div class=\"panel-heading\">{{unit}}</div>\n                            <div class=\"panel-body\">{{JSONValuesList[i]}}</div>\n                        </div>\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'RAWEDIT'\">\n                        <div contenteditable=\"true\" >{{stringValue}}</div>\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchCase=\"'NEWKEY'\">\n                        <div class=\"panel-heading\">\n                            <div class=\"row\">\n                                <div class=\"col-lg-10\">\n                                    <input id=\"addKeyName\" class=\"form-control\" placeholder=\"Key Name\"/>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"panel-body\">\n                            <div class=\"row\">\n                                <div class=\"col-lg-10\">\n                                    <input id=\"addKeyValue\" class=\"form-control\" placeholder=\"Values\"/>\n                                </div>\n                            </div>\n                        </div>\n                        <button class=\"btn btn-success\" (click)=\"newKey()\">Save</button>\n                    </div>\n                    <div class=\"JSONValues\" id=\"JSONValues\" *ngSwitchDefault>\n                        <div style='word-break: break-all; word-wrap: break-word;'>{{stringValue}}</div>\n                    </div>\n                  </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div>\n    <!--\n    TODO list\n    \n    -distinguish between plain text and JSON (scan for c-brackets)\nMake raw text mode\nadd support for parsing nested json objects\n\nLATER\nMake statistics page\nMake history page\nUpload to DHIS2 and make a namespace\nSave changes to keys\nSave history of changes-->\n</div>\n    \n"
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map