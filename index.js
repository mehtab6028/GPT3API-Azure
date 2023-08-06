import {Configuration , OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


 const configuration =  new Configuration({
     organization: "org-",
     apikey: "sk-",

 });

 const openai =  new OpenAIApi(configuration);

// // Initializing the express App
 const app=express();
 const port = 3000;

 app.use(bodyparser.json());
 app.use(cors());
 
  
 app.post("/", async (req,res) => {

     const {messages} = req.body;
     console.log(messages)

     //Query to Chat Model
     const completion = await openai.createChatCompletion({
     model: "gpt-3.5-turbo",
     messages: [
         {"role": "system", "content": "You are a Personal assistant."},
         ... messages
         //{role: "user", content:`${message}`},

     ]
     })
     
     res.json({
         completion: completion.data.choices[0].message
     })

 });

 app.listen(port,() => {
     console.log(`The app listening at http://localhost:${port}`);
});






