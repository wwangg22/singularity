// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Table} from "sst/node/table"
import { DynamoDB } from 'aws-sdk'


type Data = {
    name?: string,
    data?: any,
  }
const dynamoDb = new DynamoDB.DocumentClient();

async function getBlog(blogid:any) {
    var params = {
        TableName: Table.onetable.tableName,
        Key: {
            "PK": "BLOG",
            "SK": "BLOG#" + blogid// Replace with your GSI1SK value
        },
        // Optional - ProjectionExpression: "Attribute1, Attribute2, Attribute3"
    };

    try {
        const data = await dynamoDb.get(params).promise();
        if (data.Item) {
            console.log("GetItem succeeded:");
            return data.Item;
        } else {
            console.log("Item not found");
            return;
        }
    } catch (err) {
        console.error("Unable to get item. Error JSON:");
        return;
    }

    
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
        const blogid = req.query.blogid;
        if (blogid){
            const bloginfo = await getBlog(blogid);
            if (!bloginfo){
                res.status(400).json({data:'no blog exist'})
                return
            }
            res.status(200).json({ data: JSON.stringify(bloginfo)})
        }
        else{
            res.status(400).json({ data: 'not blogid'})
        }
  }
  