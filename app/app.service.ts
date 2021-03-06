import { Injectable }    from '@angular/core';
import {Headers, Http} from '@angular/http';
import { DataStore } from './dataStore';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {error} from "util";


@Injectable()
export class AppService {

    //VARIABLES START

    private serverUrl = '';
    private historyUrl = '';

    private headers = new Headers({'Content-Type': 'application/json'});

    private basicAuth = `Basic ${btoa('admin:district')}`;

    //VARIABLES END

    constructor(private http: Http) {

    }

    setUrlAndNamespace(url: string, namespace: string){
        this.serverUrl = url + "/api/dataStore";
        this.historyUrl = this.serverUrl + "/" + namespace;
        console.log("Historyurl: ",this.historyUrl);
    }


    newKey(namespace : string, keyName : string, keyValue : string): any {
        //Receive a namespace and a keyName and saves it to the database.

        this.headers.append('Authorization', this.basicAuth);

        return this.http
            .post(`${this.serverUrl}/${namespace}/${keyName}`, `${keyValue}`,{headers: this.headers})
            .map(res => res.json())
    }

    loadDataStore(): any {
        //Return a list of all datastore objects in the database.

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http
            .get(`${this.serverUrl}?paging=false&level=1`, {headers: this.headers})
            .map(res => res.json())
    }

    deleteDataStoreObject(objectId): any {
        //Delete a datastore object with the received ID
        //Not implemented since namespaces are not removable from the current api
    }

    getNamespaces(): any{
        //Returns all the registered namespaces.

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));

        return this.http.get(this.serverUrl, {headers: this.headers}).map(res => res.json());
    }

    getNamespaceKeys( namespace ): any{
        //returns all the keys for a given namespace

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http.get(this.serverUrl + '/' + namespace, {headers: this.headers})
            .map(res => res.json());
    }

    getJSONValues( namespace, key ): any{
        //returns all the JSON values of a given key

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));

        return this.http.get(this.serverUrl + '/' + namespace + '/' + key, {headers: this.headers})
            .map(res => res.json());
    }

    saveChanges(namespace: string, key: string, content: string): any{
        //Saves changes to a value for a selected key

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));

        var oldContentObs = this.http.get(this.serverUrl + '/' + namespace + '/' + key, {headers: this.headers});

        var res = this.http.put(this.serverUrl + '/' + namespace + '/' + key, `${content}` ,{headers: this.headers})
            .map(res => res.json());

        oldContentObs.subscribe(res => this.historyChange(namespace, key, JSON.stringify(res.json()), "UPDATE"));

        return res;
    }
    historyChange(namespace: string, key: string, oldContent: string, type: string): any{
        //Saves changes to the history

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
            .get(`${this.historyUrl}/${historyKey}`, {headers: this.headers})
            .map(res => {

                console.log(JSON.stringify(res.json()));

                historyContent = res.json();

                var historyJSON = JSON.parse('{"DATE":"' + date.toUTCString() + '","TYPE":"' + type + '","CONTENT":' + oldContent + '}');
                historyContent.push(historyJSON);
                stringJSON = JSON.stringify(historyContent);
            })
            .subscribe(
                (data) => {
                    console.log("Change existing history key");
                    console.log("New content: ", historyContent)

                    var res = this.http.put(this.historyUrl + '/' + historyKey, `${stringJSON}`, {headers: this.headers})
                        .map(res => res.json());

                    return res.subscribe(res => console.log(JSON.stringify(res)))
                },
                (err) => {
                    console.log("Adding new history key");

                    historyContent = [];
                    var historyJSON = JSON.parse('{"DATE":"' + date.toUTCString() + '","TYPE":"' + type + '","CONTENT":' + oldContent + '}');
                    historyContent.push(historyJSON);
                    stringJSON = JSON.stringify(historyContent);

                    var res = this.http
                        .post(`${this.historyUrl}/${historyKey}`, `${stringJSON}`,{headers: this.headers})
                        .map(res => res.json());

                    return res.subscribe(res => console.log(JSON.stringify(res)));
                }
            );

    }

    
    deleteKey(namespace: string, key: string): any{
        //Delete given key from the given namespace.

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));

        var oldContentObs = this.http.get(this.serverUrl + '/' + namespace + '/' + key, {headers: this.headers})
        oldContentObs.subscribe(res => this.historyChange(namespace, key, JSON.stringify(res.json()), "DELETE"));

        return this.http.delete(this.serverUrl + '/' + namespace + '/' + key, {headers: this.headers})
            .map(res => res.json());
    }
    historyDelete(){

    }
}