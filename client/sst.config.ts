import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { Bucket, Table, Config} from "sst/constructs";


export default {
  config(_input) {
    return {
      name: "client",
      region: "us-east-1",
    };
  },
  stacks(app) {
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
   
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "public");
      const JWT_SECRET_TOKEN = new Config.Secret(stack, "JWT_SECRET_TOKEN");
      
      const table = new Table(stack, "onetable", {
        fields: {
          PK: "string",
          SK: "string",
          GSI1PK: "string",
          GSI1SK: "string",
        },
        primaryIndex: { partitionKey: "PK", sortKey: "SK" },
        globalIndexes: {
          GSI1: {
            partitionKey: "GSI1PK",
            sortKey: "GSI1SK",
          },
        }
      });
      const site = new NextjsSite(stack, "site",{
          bind: [table, bucket, JWT_SECRET_TOKEN],
          environment: {
            REGION: 'us-east-1',
          },
        });


      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;



