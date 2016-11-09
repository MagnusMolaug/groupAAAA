import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { DataStore } from './dataStore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Injectable()
export class AppService {

    //VARIABLES START

    private serverUrl = 'https://play.dhis2.org/test/api/dataStore';
    private basicAuth = `Basic ${btoa('admin:district')}`;

    private headers = new Headers({'Content-Type': 'application/json'});
    private res = "";

    //VARIABLES END

    constructor(private http: Http) {
    }

    saveDataStoreObject(dataStore: DataStore): any {
        //Receive a datastore object and saves it to the database.

        console.log(JSON.stringify(dataStore));
        this.headers.append('Authorization', this.basicAuth);
        return this.http
            .get(`${this.serverUrl}?paging=false&level=1`, {headers: this.headers})
            //.map(res => res.json())
    }

    loadDataStore(): any {
        //Return a list of all datastore objects in the database.

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http
            .get(`${this.serverUrl}?paging=false&level=1`, {headers: this.headers})
            //.map(res => res.json())
    }

    deleteDataStoreObject(objectId): any {
        //Delete a datastore object with the received ID
    }

    getNamespaces(): any{
        //Gets list of namespaces
        //this.headers.append('Authorization', "Basic " + btoa("admin:district"));

        /*this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http
            .get('${this.serverUrl}?paging=false&level=1', {headers: this.headers})*/
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://play.dhis2.org/demo/api/dataStore",
            "method": "GET",
            "headers": {
                "authorization":"Basic YWRtaW46ZGlzdHJpY3Q=",
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, HEAD, GET, OPTIONS, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type, Content-Range, Content-Disposition, Content-Description",
                "Access-Control-Max-Age": "1728000"
            }
        }
        $.ajax(settings).done(function (response) {
            console.log("A" + response);
            this.res = response;
        });
        console.log("RES: " + this.res);
        return this.res;

        //return this.http.get(this.serverUrl, {headers: this.headers})
            //.map(res => res.json())
    }

    getNamespaceKeys(){

    }

    getKeyMetaData(){

    }

    addNamespaceKey(){

    }

    changeKeyMetadata(){

    }

    deleteNamespaceKey(){

    }

}