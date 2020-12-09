import { Config, Environments } from "./config";

export const configStaging: Config = {
  port: 3000,
  env: process.env.NODE_ENV || Environments.staging,
  name: 'graphql-api',
  mongoUrl: '',  
};