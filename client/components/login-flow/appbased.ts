import {Table} from "sst/node/table"
import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient();

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
        dynamoDb.put(params
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



export {
    addNewUser,
    checkUserEmail
}