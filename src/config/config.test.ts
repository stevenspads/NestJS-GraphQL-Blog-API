import { Config, Environments } from "./config";

export const configTest: Config = {
  port: 3000,
  env: process.env.NODE_ENV || Environments.test,
  name: 'graphql-api',
  mongoUrl: 'mongodb://localhost:27017/blog',  
};