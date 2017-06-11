
$(document).ready(function() {


/*this below fuction takes raw json and combines it into a MapBox format*/

  function CombineGeoJson(data){
    var GeoJson= {
      "id": "points",
      "type": "symbol",
      "source": {
      "type": "geojson",
      "data": {
      "type": "FeatureCollection",
      "features": []
      },
      "maxzoom" : 20
            },
    "layout": {
      "icon-image": "WWT1",
      "icon-size" : 1

      }
    }


var count = 0;
while (data.serveJson.wwtp[count]) {
    count++;
}

for(i=0 ; i < count ; i++){
  var lon=data.serveJson.wwtp[i].lon
  var lat=data.serveJson.wwtp[i].lat
  var coord=[lon,lat]
  var name=data.serveJson.wwtp[i].name
  var address =data.serveJson.wwtp[i].address
  var city=data.serveJson.wwtp[i].city
  var state=data.serveJson.wwtp[i].state
  var zip=data.serveJson.wwtp[i].zip
  var supplier=data.serveJson.wwtp[i].supplier
  var descript=data.serveJson.wwtp[i].descript
  var outfall=data.serveJson.wwtp[i].outfall
  var disposal=data.serveJson.wwtp[i].disposal
  var sic=data.serveJson.wwtp[i].sic
  var level=data.serveJson.wwtp[i].level
  var total=Math.round(data.serveJson.wwtp[i].total*0.325851)
  var discharge=Math.round(data.serveJson.wwtp[i].discharge*0.325851)
  var recycled_in_area=Math.round(data.serveJson.wwtp[i].recycled_in_area*0.325851)
  var recycled_out_area=Math.round(data.serveJson.wwtp[i].recycled_out_area*0.325851)

  GeoJson.source.data.features.push({"type": "Feature", "geometry": {"type": "Point", "coordinates": coord},
    "properties": {"name": name, "city": city, "supplier": supplier,
    "outfall":outfall, "descript": descript, "disposal": disposal, "level": level,
    "total" : total, "discharge": discharge, "recycled_in_area" : recycled_in_area, "recycled_out_area" : recycled_out_area}})
  }

  return GeoJson
}

/*Gets current location data synchronously*/
function testAjax(){
  var result= "";
  $.ajax({
       url: 'http://ip-api.com/json',
       async: false,
       success: function (data) {
          result=data;
       }
   });
    return result
 }


/*this is the code for the pie chart*/
var ctx = document.getElementById('myChart').getContext('2d');
var myPieChart = new Chart(ctx,{
  type: 'pie',
   data: {
     labels: ["Water treated and discharged", "Water recycled in area", "water recycled out of area"],
     datasets: [{
       backgroundColor: [
         "#3498db",
         "#98fb98",
         "#6666ff"
       ],
       data: [20,20,20]
     }]
   },
   options: {
     animation: {
       animateRotate: false,
       animateScale: false
     },
     responsive: true,
     maintainAspectRatio: false,
     legend: {
       display: true,
       position: 'bottom'
     },
     title:{display: true,
      text:'Water Treated (MGAL/Yr)'
    }
   }
});

/*below is the code for the bar chart*/

var ctb = document.getElementById('myChart1').getContext('2d');
var myBarChart = new Chart(ctb,{
  type: 'bar',
   data: {
     labels: [""],
      datasets: [{
        label: 'Treated Water (MGAL/Yr)',
        backgroundColor:[ "#3498db"],
        hoverBackgroundColor :["eeeeee"],
        data:[100]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
        position: 'bottom'
      },
      title:{display: true,
      text:'Total Water Treated (MGAL/Yr)'
        }
      }
  });

/*function for getting current coordinates*/

  function getCurrentLocation(){
    var cur=testAjax();
    var curLat=cur.lat;
    var curLon=cur.lon;
    var curCor=[curLon,curLat];
    return curCor
  };
  var api = "/api/wwtp?q="
  var mod = "all"

  function CombineUrl(api,mod){
    return api+mod
  }

/*below here is the main methods*/

$.getJSON(CombineUrl(api,mod), function(obj){


mapboxgl.accessToken = 'pk.eyJ1Ijoia3Vyb2thdzEiLCJhIjoiY2l6cnQyYmd4MDBkYTJ3bWZ6YTgyaGJiMSJ9.tpa8BK9EO4105nho_nQxZA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kurokaw1/cj3mlau4p00012sm9ehaf6zeg',
    center: getCurrentLocation(),
    zoom: 10
  });

/*this below function sets marker images*/

var NewGeoJson=CombineGeoJson(obj);
map.on('load', function(){
  map.addLayer(NewGeoJson)
})

 map.on('click', 'points', function (e) {
new mapboxgl.Popup()
.setLngLat(e.features[0].geometry.coordinates)
.setHTML("<b>"+e.features[0].properties.name+"</b>"+ "<br>" + 'Total Wastewater Volume (MGAL/Yr): ' + e.features[0].properties.total
    + "<br>"+ 'Location: '+ e.features[0].properties.city+ "<br>" + 'Treatment Level: ' + e.features[0].properties.level +
    "<br>"+ 'Outfall: '+ e.features[0].properties.outfall)
.addTo(map);
var tot=e.features[0].properties.total
var rin=e.features[0].properties.recycled_in_area
var roa=e.features[0].properties.recycled_out_area
var wd=e.features[0].properties.discharge
myPieChart.data.datasets[0].data=[wd,rin,roa]
myPieChart.update();
myBarChart.data.datasets[0].data=[tot]
myBarChart.update();
});

map.on('mouseenter', 'points', function(){
   map.getCanvas().style.cursor = 'pointer';
})

map.on('mouseleave', 'points', function() {
    map.getCanvas().style.cursor = '';
});



/*this below is the serach function that flies to city to city*/

  document.getElementById('fly').addEventListener('click', function () {
        var search=document.getElementById('bar').value;
        if (search==""){
          search="Sacramento"
          }

        var searchCoord = "http://api.openweathermap.org/data/2.5/weather?q="+search+",usa&appid=4e44e3428b01d9a6ad76981f8ab8db5a";
        $.getJSON(searchCoord, function(data){
            var lon=data.coord.lon
            var lat=data.coord.lat
            var city=data.name

        map.flyTo({
          center: [lon,lat],
          zoom: 10
          });


      })/* end of get search location JSON*/

    }); /*end of search button lisenter*/

  });/*end of request to backend to get GeoJson*/

});/*This is the document on ready end*/
