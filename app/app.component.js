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
        this.dataStore = [];
        //private settings;
        this.model = new dataStore_1.DataStore('', '', true);
        this.loadObjectList();
    }
    AppComponent.prototype.loadObjectList = function () {
        /*this.appService.loadDataStore()
            .subscribe( res => this.updateObjectList(res.dataStores) );*/
        //console.log(this.appService.getNamespaces());
        //var AAAA = this.appService.getNamespaces();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://play.dhis2.org/demo/api/dataStore",
            "method": "GET",
            "headers": {
                "authorization": "Basic YWRtaW46ZGlzdHJpY3Q=",
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, HEAD, GET, OPTIONS, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type, Content-Range, Content-Disposition, Content-Description",
                "Access-Control-Max-Age": "1728000"
            }
        };
        $.ajax(settings).done(function (response) {
            console.log("A" + response);
        });
        //this.appService.getNamespaces();
        /*
        $.ajax(this.settings).done(function (response) {
            return response;
        });*/
    };
    AppComponent.prototype.updateObjectList = function (dataStore) {
        //updates variables of an object in the datastore.
    };
    AppComponent.prototype.newDataStore = function () {
        //Create a new object and save it to the datastore.
        this.appService.saveDataStoreObject(this.model)
            .subscribe(this.loadObjectList());
    };
    AppComponent.prototype.deleteObject = function (event) {
        //Delete an object fromm the datastore.
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div id=\"outerContainer\">\n        <div class=\"app\" id=\"mainContainer\">\n            <nav class=\"navbar navbar-default\">\n              <div class=\"container-fluid\">\n                <!-- Brand and toggle get grouped for better mobile display -->\n                <div class=\"navbar-header\">\n                  <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                  </button>\n                  <a class=\"navbar-brand\" href=\"#\">Brand</a>\n                </div>\n            \n                <!-- Collect the nav links, forms, and other content for toggling -->\n                <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                  <ul class=\"nav navbar-nav\">\n                    <li class=\"active\"><a href=\"#\">Link <span class=\"sr-only\">(current)</span></a></li>\n                    <li><a href=\"#\">Link</a></li>\n                    <li class=\"dropdown\">\n                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n                      <ul class=\"dropdown-menu\">\n                        <li><a href=\"#\">Action</a></li>\n                        <li><a href=\"#\">Another action</a></li>\n                        <li><a href=\"#\">Something else here</a></li>\n                        <li role=\"separator\" class=\"divider\"></li>\n                        <li><a href=\"#\">Separated link</a></li>\n                        <li role=\"separator\" class=\"divider\"></li>\n                        <li><a href=\"#\">One more separated link</a></li>\n                      </ul>\n                    </li>\n                  </ul>\n                  <ul class=\"nav navbar-nav navbar-right\">\n                    <li><a href=\"#\">Link</a></li>\n                    <li class=\"dropdown\">\n                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n                      <ul class=\"dropdown-menu\">\n                        <li><a href=\"#\">Action</a></li>\n                        <li><a href=\"#\">Another action</a></li>\n                        <li><a href=\"#\">Something else here</a></li>\n                        <li role=\"separator\" class=\"divider\"></li>\n                        <li><a href=\"#\">Separated link</a></li>\n                      </ul>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </nav>\n        \n        \n            <div id=\"dataStoreMainList\" class=\" col-md-3 col-sm-3\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">\n                        List of objects\n                    </div>\n                    <!--<form class=\"\">\n                       <div class=\"form-group\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Search\">\n                       </div>\n                        <!--button type=\"submit\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></button>\n                      </form>-->\n                    <div class=\"list-group-item\"><input type=\"text\" class=\"form-control\" placeholder=\"Search for an object\"></div>\n                    <div class=\"list-group namespaceList\">\n                      <a href=\"#\" class=\"list-group-item active\">Namespace-1</a>\n                      <a href=\"#\" class=\"list-group-item\">Namespace-2</a>\n                      <a href=\"#\" class=\"list-group-item\">Namespace-3</a>\n                      <a href=\"#\" class=\"list-group-item\">Namespace-4</a>\n                      <a href=\"#\" class=\"list-group-item\">Namespace-5</a>\n                      <a href=\"#\" class=\"list-group-item\">Namespace-6</a>\n                      <a href=\"#\" class=\"list-group-item\">Namespace-7</a>\n                      <a href=\"#\" class=\"list-group-item\">Namespace-8</a>\n                      <a href=\"#\" class=\"list-group-item\">Namespace-9</a>\n                    </div>\n                </div>\n            </div>\n\n            <div id=\"dataStoreKeyList\" class=\" col-md-3 col-sm-3\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">\n                        List of keys\n                    </div>\n                    <!--<form class=\"\">\n                       <div class=\"form-group\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Search\">\n                       </div>\n                        <!--button type=\"submit\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></button>\n                      </form>-->\n                    <div class=\"list-group-item\"><input type=\"text\" class=\"form-control\" placeholder=\"Search for a key\"></div>\n                    <div class=\"list-group namespaceList\">\n                      <a href=\"#\" class=\"list-group-item active\">Key-1</a>\n                      <a href=\"#\" class=\"list-group-item\">Key-2</a>\n                      <a href=\"#\" class=\"list-group-item\">Key-3</a>\n                      <a href=\"#\" class=\"list-group-item\">Key-4</a>\n                      <a href=\"#\" class=\"list-group-item\">Key-5</a>\n                      <a href=\"#\" class=\"list-group-item\">Key-6</a>\n                      <a href=\"#\" class=\"list-group-item\">Key-7</a>\n                      <a href=\"#\" class=\"list-group-item\">Key-8</a>\n                      <a href=\"#\" class=\"list-group-item\">Key-9</a>\n                    </div>\n                </div>\n            </div>\n            \n            <div id=\"dataStoreInfo\" class=\" col-md-6 col-sm-6\">\n                <div class=\"panel panel-default\">\n                  <div class=\"panel-heading\">\n                    <div class=\"row\">\n                      <div class=\"col-lg-6 h4\">\n                        Key: 5G6Jjgfjj\n                      </div>\n                      <div class=\"pull-right\">\n                        <a href=\"edit.html\" class=\"btn btn-primary\">Edit mode</a> <button class=\"btn btn-danger buttonLeftAdjust\">Delete object</button>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"panel-body\">\n                    <div class=\"JSONValues\">\n                        <div class=\"panel panel-default\">\n                            <div class=\"panel-heading\">JSON value 1</div>\n                            <div class=\"panel-body\">value</div>\n                        </div>\n                        <div class=\"panel panel-default\">\n                            <div class=\"panel-heading\">JSON value 2</div>\n                            <div class=\"panel-body\">value</div>\n                        </div>\n                        <div class=\"panel panel-default\">\n                            <div class=\"panel-heading\">JSON value 3</div>\n                            <div class=\"panel-body\">value</div>\n                        </div>\n                    </div>\n                  </div>\n                </div>\n            </div>\n        </div>\n    </div>\n                \n"
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map