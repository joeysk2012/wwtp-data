
$(document).ready(function() {

  var api = "http://localhost:3001/api/wwtp?q="
  var all = "all"

  function CombineUrl(api,mod){
    return api+mod
  }

  $.getJSON(CombineUrl(api,all), function(obj){

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
              }
            },
    "layout": {
      "icon-image": "{icon}-15",
      "text-field": "{title}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0],
      "text-anchor": "top"
      }
    }


var count = 0;
while (data.wwtpdata.wwtp[count]) {
    count++;
}

for(i=0 ; i < count ; i++){
  var lon=data.wwtpdata.wwtp[i].lon
  var lat=data.wwtpdata.wwtp[i].lat
  var coord=[lon,lat]
  var name=data.wwtpdata.wwtp[i].name
  var address =data.wwtpdata.wwtp[i].address
  var city=data.wwtpdata.wwtp[i].city
  var state=data.wwtpdata.wwtp[i].state
  var zip=data.wwtpdata.wwtp[i].zip
  var supplier=data.wwtpdata.wwtp[i].supplier
  var descript=data.wwtpdata.wwtp[i].descript
  var outfall=data.wwtpdata.wwtp[i].outfall
  var disposal=data.wwtpdata.wwtp[i].disposal
  var sic=data.wwtpdata.wwtp[i].sic
  var level=data.wwtpdata.wwtp[i].level
  var total=Math.round(data.wwtpdata.wwtp[i].total*0.325851)
  var discharge=Math.round(data.wwtpdata.wwtp[i].discharge*0.325851)
  var recycled_in_area=Math.round(data.wwtpdata.wwtp[i].recycled_in_area*0.325851)
  var recycled_out_area=Math.round(data.wwtpdata.wwtp[i].recycled_out_area*0.325851)

  GeoJson.source.data.features.push({"type": "Feature", "geometry": {"type": "Point", "coordinates": coord},
    "properties": {"icon": "harbor", "name": name, "iconSize": 10, "city": city, "supplier": supplier,
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

/*below here is the main methods*/


mapboxgl.accessToken = 'pk.eyJ1Ijoia3Vyb2thdzEiLCJhIjoiY2l6cnQyYmd4MDBkYTJ3bWZ6YTgyaGJiMSJ9.tpa8BK9EO4105nho_nQxZA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: getCurrentLocation(),
    zoom: 10
  });

  var NewGeoJson=CombineGeoJson(obj);

/*this below function sets marker images*/


NewGeoJson.source.data.features.forEach(function(marker) {

  var pop=new mapboxgl.Popup()
    .setHTML("<h5>"+marker.properties.name+"<h5>"+ "<br>" + 'Total Wastewater Volume (MGAL/Yr): ' + marker.properties.total
    + "<br>"+ 'Location: '+ marker.properties.city+ "<br>" + 'Treatment Level: ' + marker.properties.level +
    "<br>"+ 'Outfall: '+ marker.properties.outfall)
  var mark = document.createElement('div');
    mark.className = 'marker';
    mark.style.backgroundImage = 'url(/gfx/WWT1.svg)'
    mark.style.width = '50px';
    mark.style.height = '50px';

    mark.addEventListener('click',function() {
      var tot=marker.properties.total
      var rin=marker.properties.recycled_in_area
      var roa=marker.properties.recycled_out_area
      var wd=marker.properties.discharge
      myPieChart.data.datasets[0].data=[wd,rin,roa]
      myPieChart.update();
      myBarChart.data.datasets[0].data=[tot]
      myBarChart.update();

  })

  mark.addEventListener('mouseenter',function() {
      map.getCanvas().style.cursor = 'pointer';

   })

   mark.addEventListener('mouseleave',function() {
     map.getCanvas().style.cursor = '';

    })
    
  new mapboxgl.Marker(mark, {offset: [-20, -15]})
        .setLngLat(marker.geometry.coordinates)
        .setPopup(pop)
        .addTo(map);
  });

/*this below is the serach function that flies to city to city*/

  document.getElementById('fly').addEventListener('click', function () {
        var search=document.getElementById('bar').value;
        if (search==""){
          search="Sacramento"
          }
        event.preventDefault();

        var searchCoord = "http://api.openweathermap.org/data/2.5/weather?q="+search+",usa&appid=4e44e3428b01d9a6ad76981f8ab8db5a";
        $.getJSON(searchCoord, function(data){
            var lon=data.coord.lon
            var lat=data.coord.lat
            var city=data.name

        map.flyTo({
          center: [lon,lat],
          zoom: 10
          });

      document.getElementById('bar').value=""

      })/* end of get search location JSON*/

    }); /*end of search button lisenter*/

  });/*end of request to backend to get GeoJson*/

});/*This is the document on ready end*/
