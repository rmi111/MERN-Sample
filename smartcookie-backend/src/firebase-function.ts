const functions = require('firebase-functions');
const admin = require('firebase-admin');

import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

import { ref, set, query , get, orderByChild, equalTo } from 'firebase/database';

var serviceAccount = require("../../resource/firebase-service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://smartcookie-backend-default-rtdb.firebaseio.com",
  databaseAuthVariableOverride: null
});


export const sendEmail = functions.https.onRequest((request:Request, response:Response) => {
    try {
        const client = require('drip-nodejs')({ token: 'YOUR_API_KEY', accountId: 'YOUR_ACCOUNT_ID' });
        const db = admin.database();
        let qref = query(ref(db, 'users'));
        get(qref).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val().email);
                return response.status(200).json({
                    message: snapshot.val()
                });
            } else {
                return response.status(200).json({
                    status: 'success',
                    message: 'Failed to add data'
                }); 
            }
        }).catch((error) => {
            return response.status(200).json({
                status: 'success',
                message: 'Failed to add data'
            }); 
        });
    
        
        client.push(
            [
              "subscribe",
              {
                campaign_id: "9999999",
                fields: 
                {
                  email: "john@acme.com"
                },
                success: function(result: String) {
                     response.status(200).json({
                        status: 'success',
                        message: result
                    });
                }
              }
            ]
          );
          
    } catch(error) {
        response.status(500).json(error);
    }
  }
);