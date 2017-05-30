const express = require('express');
const fs = require('fs');
//const sqlite = require('sql.js');
//const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');
//const db = new sqlite.Database(filebuffer);
const wwtpdata= require('./data/wwtp_ca.json')
const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Express only serves static assets in production*/
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

/*this is the GET protocol for serving up json query include ?q=*/
app.get('/api/wwtp', function(req, res, next) {
  const param = req.query.q;
  var serveJson= {"wwtp":[]};

  if(param=="all"){
    return res.json({
      wwtpdata
      });

  } if(isNaN(param)==true){
      serveJson=wwtpdata.wwtp.filter(function(wwtp){
        return  wwtp.city.toLowerCase()==param.toLowerCase()
        })
          return res.json({serveJson})


  }  if(isNaN(param)==false){
      serveJson=wwtpdata.wwtp.filter(function(wwtp){
        return  wwtp.zip.substring(0,3)==param.substring(0,3)
      })
      res.json({serveJson})
    }
    if(param==null){
      res.json({"This is an error": "error"})
    }else{
    res.json({"this is an error" : "error"})
    }



  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.

})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
