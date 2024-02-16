
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Table} from "sst/node/table"
import { DynamoDB } from 'aws-sdk'




type Data = {
  name?: string,
  data?: any,
}
const dynamoDb = new DynamoDB.DocumentClient();


const store = async () => {


    const params = {
      TableName: Table.onetable.tableName,
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
          ":pk": "BLOG"// Partition key value for blogs
      },
      ScanIndexForward: false,
      Limit: 4,
  };

    try {
        const results = await dynamoDb.query(params).promise();
        return results
    } catch (error) {
        console.error("Error querying DynamoDB:", error);
        return
    }

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const results = await store();
    console.log(results?.Items)
    res.status(200).json({ data: JSON.stringify(results?.Items)})
}
