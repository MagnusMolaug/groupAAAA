# Angular 2 Datastore Manager application by Group AAAA for INF5750

##Group members
**Name:** Magnus W. Molaug
**Student id:** kmmolaug

**Name:** Eirik Fjellheim Andersen
**Student id:** eirikfan

**Name:** Cory Steven Briggs
**Student id:** corysb

**Name:** Akam Neeson
**Student id:** akamn



##How to run this stuff

Install NodeJS
https://nodejs.org/en/download/current/

Install the dependencies
```bash
npm install
```

Start the dev server that uses webpack (see details in the webpack.config.js)
```
npm start
```

Open the webserver in either Chrome or Firefox and point to
> http://localhost:3000

For this to work properly you'll need a local version of DHIS2 or point the navigate to the demo or dev servers (https://play.dhis2.org/demo or https://play.dhis2.org/dev)
If you want to run it against either of these you will need to set up the server to accept CORS requests from http://localhost:3000
You can do this by adding `http://localhost:3000` to the CORS Whitelist in the System Settings App.

- Open dhis2
- Go to System Settings (from the menu)
- Click the access tab
- Add `http://localhost:3000` to the CORS Whitelist

If you want to run the app against the test/dev server on dhis2.org replace the entries in the manifest.webapp with a dhis2.org url.
Change this:
```"dhis": {
            "href": "*",
            "namespace": "DSM_HISTORY"
        }```
To this:
```"dhis": {
            "href": "https://play.dhis2.org/test",
            "namespace": "DSM_HISTORY"
        }```
 And remember to change the namespace to an already existing namespace.