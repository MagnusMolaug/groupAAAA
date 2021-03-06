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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var AppService = (function () {
    //VARIABLES END
    function AppService(http) {
        this.http = http;
        //VARIABLES START
        this.serverUrl = '';
        this.historyUrl = '';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.basicAuth = "Basic " + btoa('admin:district');
    }
    AppService.prototype.setUrlAndNamespace = function (url, namespace) {
        this.serverUrl = url + "/api/dataStore";
        this.historyUrl = this.serverUrl + "/" + namespace;
        console.log("Historyurl: ", this.historyUrl);
    };
    AppService.prototype.newKey = function (namespace, keyName, keyValue) {
        //Receive a namespace and a keyName and saves it to the database.
        this.headers.append('Authorization', this.basicAuth);
        return this.http
            .post(this.serverUrl + "/" + namespace + "/" + keyName, "" + keyValue, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.loadDataStore = function () {
        //Return a list of all datastore objects in the database.
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http
            .get(this.serverUrl + "?paging=false&level=1", { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.deleteDataStoreObject = function (objectId) {
        //Delete a datastore object with the received ID
        //Not implemented since namespaces are not removable from the current api
    };
    AppService.prototype.getNamespaces = function () {
        //Returns all the registered namespaces.
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http.get(this.serverUrl, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    AppService.prototype.getNamespaceKeys = function (namespace) {
        //returns all the keys for a given namespace
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http.get(this.serverUrl + '/' + namespace, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getJSONValues = function (namespace, key) {
        //returns all the JSON values of a given key
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http.get(this.serverUrl + '/' + namespace + '/' + key, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.saveChanges = function (namespace, key, content) {
        //Saves changes to a value for a selected key
        var _this = this;
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        var oldContentObs = this.http.get(this.serverUrl + '/' + namespace + '/' + key, { headers: this.headers });
        var res = this.http.put(this.serverUrl + '/' + namespace + '/' + key, "" + content, { headers: this.headers })
            .map(function (res) { return res.json(); });
        oldContentObs.subscribe(function (res) { return _this.historyChange(namespace, key, JSON.stringify(res.json()), "UPDATE"); });
        return res;
    };
    AppService.prototype.historyChange = function (namespace, key, oldContent, type) {
        //Saves changes to the history
        var _this = this;
        var historyKey = namespace + ":" + key;
        var date = new Date();
        console.log(date);
        console.log(this.historyUrl + '/' + historyKey);
        console.log(oldContent);
        this.headers.append('Authorization', this.basicAuth);
        var exist = true;
        var historyContent = [];
        var stringJSON = "";
        var get = this.http
            .get(this.historyUrl + "/" + historyKey, { headers: this.headers })
            .map(function (res) {
            console.log(JSON.stringify(res.json()));
            historyContent = res.json();
            var historyJSON = JSON.parse('{"DATE":"' + date.toUTCString() + '","TYPE":"' + type + '","CONTENT":' + oldContent + '}');
            historyContent.push(historyJSON);
            stringJSON = JSON.stringify(historyContent);
        })
            .subscribe(function (data) {
            console.log("Change existing history key");
            console.log("New content: ", historyContent);
            var res = _this.http.put(_this.historyUrl + '/' + historyKey, "" + stringJSON, { headers: _this.headers })
                .map(function (res) { return res.json(); });
            return res.subscribe(function (res) { return console.log(JSON.stringify(res)); });
        }, function (err) {
            console.log("Adding new history key");
            historyContent = [];
            var historyJSON = JSON.parse('{"DATE":"' + date.toUTCString() + '","TYPE":"' + type + '","CONTENT":' + oldContent + '}');
            historyContent.push(historyJSON);
            stringJSON = JSON.stringify(historyContent);
            var res = _this.http
                .post(_this.historyUrl + "/" + historyKey, "" + stringJSON, { headers: _this.headers })
                .map(function (res) { return res.json(); });
            return res.subscribe(function (res) { return console.log(JSON.stringify(res)); });
        });
    };
    AppService.prototype.deleteKey = function (namespace, key) {
        //Delete given key from the given namespace.
        var _this = this;
        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        var oldContentObs = this.http.get(this.serverUrl + '/' + namespace + '/' + key, { headers: this.headers });
        oldContentObs.subscribe(function (res) { return _this.historyChange(namespace, key, JSON.stringify(res.json()), "DELETE"); });
        return this.http.delete(this.serverUrl + '/' + namespace + '/' + key, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.historyDelete = function () {
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map