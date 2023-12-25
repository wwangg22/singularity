import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { Bucket } from "sst/constructs";


export default {
  config(_input) {
    return {
      name: "client",
      region: "us-east-1",
    };
  },
  stacks(app) {
    
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "public");
      const site = new NextjsSite(stack, "site",{
          bind: [bucket],
        });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
