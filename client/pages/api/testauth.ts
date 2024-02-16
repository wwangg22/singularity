import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import { Table } from "sst/node/table";
import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient();

type Data = {
    title: string,
    body?:string,
}

const validateEmail = (email:String) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
const validateUsername = (username:String) => {
    return String(username).match(/[^0-9\w]/g)
};



interface UserItem {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    password: string;
    [key: string]: string;  // Allows for additional properties
}

async function addNewUser(username:string, password:string, email:string, name:string | null = null) {

    let items:UserItem = {
            PK: "USER#" + email,
            SK: "USER#" + email,
            GSI1PK: "USERID#" + username,
            GSI1SK: "USERID#" + username,
            password: password,
            username: username,
            email: email,
    }
    if (name) {
        items.name = name;
    }
    let params = {
        TableName: Table.onetable.tableName,
        Item: items
    }

    try{
        await dynamoDb.put(params
            ,function (err,data){
            if (err){
                console.log('error',err)
                return err;
            }
            else{
                console.log('data',data)
                return data;
            }
        }
    )
    }
    catch(err){
        console.log('error',err)
        return err;
    }

    
}

async function checkUserEmail(email:string) {
    var params = {
        TableName: Table.onetable.tableName,
        Key: {
            "PK": "USER#" + email, // Replace with your GSI1PK value
            "SK": "USER#" + email  // Replace with your GSI1SK value
        },
        // Optional - ProjectionExpression: "Attribute1, Attribute2, Attribute3"
    };

    try {
        const data = await dynamoDb.get(params).promise();
        if (data.Item) {
            console.log("GetItem succeeded:", JSON.stringify(data.Item, null, 2));
            return data.Item;
        } else {
            console.log("Item not found");
            return;
        }
    } catch (err) {
        console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
        return;
    }

    
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
      if (req.method === 'POST') {
        try{
            console.log(req.body)
            const {username, email, password} = req.body;
            if (!username || !email || !password || validateEmail(email) == null || validateUsername(username) != null) {
                res.status(400).json({ title: 'invalid fields'})
            }
                const ck = await checkUserEmail(email);
                if (ck) {
                    res.status(400).json({ title: 'email exists'})
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = await addNewUser(username, hashedPassword, email);

                res.status(200).json({ title: req.body.username, body: 'hey' })

        }
        catch(err){
            console.error(err);
            res.status(500).json({ title: 'Server Error', body: 'An error occurred on the server.' });
        }
          // Process a POST request
      } 
      else {
          // Handle any other HTTP method
          res.status(400).json({ title: 'error' })
      }
  }