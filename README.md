# Serverless-Lambda-Vue
----
Navigate to project directory

`$ cd serverless-lambda-vue`

#### To run Backend
` $ cd backend`
` $ npm install`

Before deployment, open `env.variables` file and replace the mongo url with urs, then deploy using below command
` $ sls deploy`

Once deployed, u will get url's like below

`endpoints:`

  `POST - https://x1sn7zzg5h.execute-api.us-east-1.amazonaws.com/dev/user`
  `GET - https://x1sn7zzg5h.execute-api.us-east-1.amazonaws.com/dev/user`
  `GET - https://x1sn7zzg5h.execute-api.us-east-1.amazonaws.com/dev/user-type`

##### Copy the base url

Enter below command to set API url for UI deployment
` export API_URL=https://x1sn7zzg5h.execute-api.us-east-1.amazonaws.com/dev/api/`

Once done, navigate to UI code

`$ cd ..`
`$ cd frontend`


`$ npm install`
` npm run dev`

The UI will be running in `http://localhost:8080`