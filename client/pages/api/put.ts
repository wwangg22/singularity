
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Table} from "sst/node/table"
import { DynamoDB } from 'aws-sdk'
import crypto from 'crypto'
import verifyJWT from '@/components/login-flow/verifyCookies'


type Data = {
  name: string,
}
type prms = {
    title: string,
    author: string,
    metadata: string,
    text?: string, 
    images?: [string],
    rawHTML?:string,
    date?: any
}
type itemprms = {
    PK: string,
    SK: string,
    GSI1PK: string,
    GSI1SK: string,
    title: string,
    author: string,
    metadata: string,
    text?: string, 
    images?: [string],
    rawHTML?:string,
    date?: any
}

const dynamoDb = new DynamoDB.DocumentClient();

const getCurCount = async () =>{
    const queryparams = {
      TableName: Table.onetable.tableName,
      KeyConditionExpression: "PK = :pk and SK = :sk",
      ExpressionAttributeValues: {
          ":pk": "blogidcounter",// Partition key value for blogs
          ":sk" : "blogidcounter"
      },
      ProjectionExpression: "#count", // Use an alias for the reserved word
      ExpressionAttributeNames: {
          "#count": "count" // Define the alias
      }
      };
      try {
          const results = await dynamoDb.query(queryparams).promise();
          console.log("Query succeeded:", results);
          if (results.Items && results.Items.length > 0 && 'count' in results.Items[0]) {
            return results.Items[0].count;
          } else {
            // Handle the case when the structure doesn't match your expectations
            // For example, return a default value or throw an error
            return; // Replace with an appropriate default value
          }
      } catch (error) {
          console.error("Error querying DynamoDB:", error);
      }
}

const updateCurCount = async ()=>{
    const params = {
        TableName: Table.onetable.tableName,
        Key: {
            PK: "blogidcounter",
            SK: "blogidcounter"
        },
        UpdateExpression: "set #cnt = #cnt + :incr",
        ExpressionAttributeValues: {
            ":incr": 1
        },
        ExpressionAttributeNames: {
            "#cnt": "count" // Alias for the 'count' attribute
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const result = await dynamoDb.update(params).promise();
        console.log("Update succeeded:", result);
    } catch (error) {
        console.error("Error updating DynamoDB:", error);
    }
}
function padNumber(num: number, size: number) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
const store = async (json: prms) => {
    var count = await getCurCount();
    if (count == undefined){
        return
    }
    const id = "BLOG#" + padNumber(count, 6);

    // Build your DynamoDB item
    let item:itemprms = {
        PK: "BLOG",
        SK: id,
        GSI1PK: "UP#" + json.author,
        GSI1SK: id,
        title: json.title,
        metadata: json.metadata,
        author:json.author,
        date: json.date,
    }

    // Add optional fields if they exist
    if (json.rawHTML){
        item.rawHTML = json.rawHTML;
    }
    if (json.images) {
        item.images = json.images;
    }

    var params = {
        TableName: Table.onetable.tableName,
        Item: item // Use the item object
    }

    dynamoDb.put(params, function (err, data) {
        if (err) {
            console.log('error', err);
            return err;
        } else {
            console.log('data', data);
            updateCurCount();
            return data;
        }
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    await verifyJWT(req.cookies.token, async (err,decoded)=> {
        if (err){
            res.status(401).json({name: 'forbidden'})
            return
        }
        if (req.method == "POST") {
            console.log(req.body);
            const j = new Date().toUTCString()
            console.log(j);
            var k: prms = {
                title: req.body.title,
                author: req.body.author, // Added author field
                metadata: req.body.metadata,
                rawHTML: req.body.rawHTML, // Added text field
                images: req.body.images, // Added images field
                date: j,
            }
            await store(k);
            res.status(200).json({ name: 'success' });
        } else {
            res.status(200).json({ name: 'not post request' });
        }
    } )
}