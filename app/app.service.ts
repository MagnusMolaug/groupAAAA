import { Injectable }    from '@angular/core';
import {Headers, Http} from '@angular/http';
import { DataStore } from './dataStore';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Injectable()
export class AppService {

    //VARIABLES START

    private serverUrl = 'https://play.dhis2.org/test/api/dataStore';

    private headers = new Headers({'Content-Type': 'application/json'});

    private basicAuth = `Basic ${btoa('admin:district')}`;

    //VARIABLES END

    constructor(private http: Http) {
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
    }

    getNamespaces(): any{
        //Returns all the registered namespaces.

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));

        //start video change to json
        //DO NOT DELETE THIS CODE! IF YOU DO YOU WILL RECEIVE A BLANKET PARTY AT 3 AM

        /*return this.http
            .put(`${this.serverUrl}/social-media-video/hjcF14oVjo4`, '{"Link": "https://www.youtube.com/embed/gFnnNWC55Iw"}', {headers: this.headers})
            .map( res => res.json() )*/

        //end video change to json

        return this.http.get(this.serverUrl, {headers: this.headers}).map(res => res.json());

    }

    getNamespaceKeys( namespace ): any{
        //returns all the keys for a given namespace

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));
        return this.http.get(this.serverUrl + '/' + namespace, {headers: this.headers})
            .map(res => res.json());
    }

    getJSONValues( namespace, key ): any{
        //returns all the JSON values o a given key

        this.headers.append('Authorization', "Basic " + btoa("admin:district"));

        return this.http.get(this.serverUrl + '/' + namespace + '/' + key, {headers: this.headers})
            .map(res => res.json());
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