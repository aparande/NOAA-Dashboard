# CalSound

A Web App which displays acoustic and ecological data along the California Coast. It uses a React front-end and an Express backend and the Firebase Firestore database.

Live at calsound.herokuapp.com

## To Run Locally

Download `serviceAccountKey.json` from Firebase ([see instructions](https://firebase.google.com/docs/admin/setup#initialize-sdk)) and save it to the top-level of the repository.

Make sure to run `npm install` in the top level directory as well as the `dashboard` directory before starting either the react app or the express server.

### To Start the Express Server
```
npm start
```
### To Start the React App
```
cd dashboard && npm start
```

## Scripts
The scripts directory has several Python scripts which can be run to upload data to Firebase.
Run a script with the `-h` flag to see its usage description.
