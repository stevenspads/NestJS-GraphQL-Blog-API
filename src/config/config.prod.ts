import { Config, Environments } from "./config";

export const configProd: Config = {
  port: 3000,
  env: process.env.NODE_ENV || Environments.prod,
  name: 'graphql-api',
  mongoUrl: '',  
};