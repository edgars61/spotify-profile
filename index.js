
//References https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
//app require express
const { response } = require('express');
const express = require('express');
const { redirect } = require('express/lib/response');
const { contentDisposition } = require('express/lib/utils');
const app = express();
const querystring = require('querystring');
//port nunber
const port = 8888;
//dotenv
require('dotenv').config()
//enviorment variables
const CLIENT_ID=process.env.CLIENT_ID;
const ClIENT_SECRET=process.env.ClIENT_SECRET;
const REDIRECT_URI=process.env.REDIRECT_URI;

//handle requests to apps homepage
app.get('/',(req,res)=>{
  res.send(REDIRECT_URI);
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


//rout handler that handles reqauest sent to /login by redirecting to spotify's /authorize endpoint
app.get('/login', (req, res) => {
  const queryParams = querystring.stringify({
    client_id:CLIENT_ID,
    response_type: 'code',
    redirect_uri:REDIRECT_URI,
  

  });
  //spotify requires CLIENT_ID, response type and redirect_uri paremeters
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

//tell the app to listen to a connection on port 8888
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})