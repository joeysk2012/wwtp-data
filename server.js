const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');
const filebuffer = fs.readFileSync('./data/hydrodata.sqlite');
const db = new sqlite.Database(filebuffer);
const app = express();
const cityData = require('./client/src/data/citydata');
const levenshtein = require('fast-levenshtein');

app.set('port', (process.env.PORT || 3001));

/*use of CORS*/
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

/* Use this code below for production build*/
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

/*this is the GET protocol for serving up json query include ?q=*/
app.get('/api/wwtp', function(req, res, next) {
  const param = req.query.q;
  sqlstr ="SELECT * from wwtp_ca"
  var responds=db.exec(sqlstr)
  var r=responds[0].values
  var d=[]
  var sourceJson={}
  var serveJson={}

  for(i=0 ; i < r.length ; i++){
      temp={}
      temp.name = r[i][1]
      temp.address =  r[i][2]
      temp.city = r[i][3]
      temp.state= r[i][4]
      temp.zip = r[i][5]
      temp.lon = r[i][6]
      temp.lat = r[i][7]
      temp.supplier =  r[i][8]
      temp.descript = r[i][9]
      temp.outfall = r[i][10]
      temp.disposal = r[i][11]
      temp.treats_ww_gen_area  = r[i][12]
      temp.sic = r[i][13]
      temp.level = r[i][14]
      temp.total = Math.round(r[i][15]*0.325851)
      temp.discharge = Math.round(r[i][16]*0.325851)
      temp.recycled_in_area = Math.round(r[i][17]*0.325851)
      temp.recycled_out_area= Math.round(r[i][18]*0.325851)
      d[i]=temp
  }
  d.splice(0,1)
  sourceJson.wwtp=d
  serveJson.wwtp=d

  function serveCityJson(param){
    let srv=sourceJson.wwtp.filter(function(wwtp){
      return  wwtp.city.toLowerCase().replace(/\s/g, '')==param.toLowerCase().replace(/\s/g, '')
      })
      return srv
    }

  function serveZipJson(param){
    let srv=sourceJson.wwtp.filter(function(wwtp){
      return  wwtp.zip.substring(0,3)==param.substring(0,3)
    })
    return srv

  } if(param=="all"){
    serveJson=sourceJson
    return res.json(serveJson);

  } if(param=="citydatalookup"){
      return res.json(cityData);

  } if(isNaN(param)==true){
    serveJson.wwtp=serveCityJson(param);
      res.json(serveJson);

  } if(isNaN(param)==false){
      serveJson.wwtp=serveZipJson(param)
        res.json(serveJson)

  } if(param==null){
      res.json({"This is an error": "error"})
  } else{
    res.json({"this is an error" : "error"})
    }
  })

app.get('/api/cities', function(req, res, next) {
  const param1 = req.query.q;
  var servCity={};

  function servCityData(input){
    var mty=[]
    var srv=cityData.filter(function(line){
      var inputValue=line.name.toLowerCase().replace(/\s/g, '')
      var outputValue=input.toLowerCase().replace(/\s/g, '')
      if(levenshtein.get(inputValue,outputValue) < 3)
      {return line}
      })

      for(i=0 ; i<srv.length ; i++){
        mty.push(levenshtein.get(srv[i].name, input))
      }

      var minIndex=0
      for (i =1; i <mty.length; i++){
        if(mty[i] < mty[0]){
          minIndex= i;
          min = mty[i];
        }
      }

      return srv[minIndex]
  }

  servCity=servCityData(param1)

  res.json(servCity);

})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
