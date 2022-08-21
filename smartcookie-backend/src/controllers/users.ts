import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

import { ref, set, query , get, orderByChild, equalTo } from 'firebase/database';
var admin = require("firebase-admin");

var serviceAccount = require("../../resource/firebase-service.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://smartcookie-backend-default-rtdb.firebaseio.com",
  databaseAuthVariableOverride: null
});

interface User 
{
    userId: String;
    userName: String;
    email: String;
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    let email: string = req.body.email;
    const db = admin.database();
    let qref = query(ref(db, 'users'), orderByChild('email'),equalTo('a@gmail.com'));
    get(qref).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return res.status(200).json({
                message: snapshot.val()
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Failed to add data'
            }); 
        }
    }).catch((error) => {
        return res.status(200).json({
            status: 'success',
            message: 'Failed to add data'
        }); 
    });
};

const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    let email: string = req.body.email;
    const db = admin.database();
    let qref = query(ref(db, 'users'), orderByChild('email'),equalTo(email));
    get(qref).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return res.status(200).json({
                message: snapshot.val()
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Failed to add data'
            }); 
        }
    }).catch((error) => {
        return res.status(200).json({
            status: 'success',
            message: 'Failed to add data'
        }); 
    });

    const client = require('drip-nodejs')({ token: 'YOUR_API_KEY', accountId: 'YOUR_ACCOUNT_ID' });
    client.push(
        [
          "subscribe",
          {
            campaign_id: "9999999",
            fields: 
            {
              email: "john@acme.com"
            },
            success: function(response: String) {
                return res.status(200).json({
                    status: 'success',
                    message: response
                });
            }
          }
        ]
      );
};

// adding a user
const addUser = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let username: string = req.body.username;
    let email: string = req.body.email;
    let userId = "user_" + Math.random().toString(16).slice(2)

    const db = admin.database();
    set(ref(db,'users/'+ userId),
    {
        userId: userId,
        userName: username,
        email: email
    }).then(() => {
        return res.status(200).json({
            status: 'success',
            message: 'Data saved successfully.'
        });
    }).catch((error) => {
        console.log(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to add data'
        }); 
    });
};

export default { getUser, sendEmail, addUser };