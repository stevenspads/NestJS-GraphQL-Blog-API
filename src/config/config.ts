export const Environments = {
  prod: 'prod',
  staging: 'staging',  
  test: 'test',
  local: 'local',
};

export interface Config {
  port: number;
  env: string;
  name: string;
  mongoUrl: string;
}

export const configLocal: Config = {
  port: 3000,
  env: process.env.NODE_ENV || Environments.local,
  name: 'graphql-api',
  mongoUrl: 'mongodb://localhost:27017/blog',  
};
