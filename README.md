# Wastewater Treatment Data Map

Hydro data maps all of the wastewater treatment plans in California. The purpose of this project is to make the public aware of where your water goes once it goes down the drain and how their water distcrit is doing compared to others in terms of recycling back into the system. There will be over 900 sites when all the data is collected. The datasource of this project is the State of California department of Water Resources 2015 Urban Water Management Plan. 

[Depatrment of Water Resources](http://www.water.ca.gov/urbanwatermanagement/uwmp2015.cfm)

# Content

- [Features](#features)
- [Search Function](#searchfunction)
- [Map](#map)
- [Charts](#charts)
- [Datatable](#datatable)
- [Database](#database)
- [Technologies Used](#technologiesused)
- [Future to Do List](#todo) 
- [About the Author](#about)



## <a name="features"></a>Features
This website features a map that can be searched for location of treatment plant by city. It will zoom into that location and display an icon marker. You can click on the icon marker to display information of that treatment plant including name, address, total water treated in a year,and total water recycled within and out of district. 


![Demo](http://imgur.com/h3Ruapl.gif)



## <a name="searchfunction"></a>Search Function
The search function features an integrated React component that feeds information both the React and vanilla Javascript. It offers suggestions on spelling of cities and only passes down information needed to render map markers for that area. The datatable also syncs with the serch function and it will only render information that pretains to the city search. Finally the All button will display all the data points and Water treatment plants in California. 

## <a name="map"></a>Map
The map is made using Mapbox GL API. It combines open street maps rendered using WebGL engine in real time for smooth loading of tiles. You can click on the icon to display popup information as well as refresh pie chart and bar chart information. 

## <a name="Charts"></a>Charts
The charts were made using Chart.js, a library used to make data visualizations. Pie chart has integration with Mapbox and will update upon clicking the marker. The pie chart displays the percentage of water discharged, water recylcled in back to the district and water recycled out of the water district. Data is taken from Urban Water Managment Plan of 2015 reported by treatetment plants. 

## <a name="Datatable"></a>Datatable
The datable was made using react-bootstrap-table by Allen Fang. It can be saved into a csv and be filtered out by each of the categories and it can be sorted by each of the columns. The table provides the same data displayed on the map. It renders only the rows that needs to be shown so it is very quick despite having to display lots of data.
  

## <a name="Database"></a>Database
The database used in this is SQlite that stores plant information. The front end calls up data using an API made with express js, a webframework for node js. The API call makes a request for json data and the back end will take information from the database and send it to the front end. 

## <a name="technologiesused"></a>Technologies Used

- Javascript
- [React](https://facebook.github.io/react/) 
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [jQuery](https://jquery.com/)
- [Mapbox GL](https://www.mapbox.com/)
- [Bootstrap](http://getbootstrap.com/)
- [Chart.js](http://www.chartjs.org/)
- [React-Bootstrap-Table](https://allenfang.github.io/react-bootstrap-table/)

## <a name="todo"></a>Future To Do List

[] Integration boundry data from each waterdistrict to map out he boundries of each district

## <a name="about"></a>About the Author
This web app was made be Joe Kurokawa, an engineer and a developer. 
- [jkurokawa.com](http://jkurokawa.com)
- [linkedin.com/jkurokawa](https://www.linkedin.com/in/joekurokawa/)
- [github.com/joeysk2012](http://github.com/joeysk2012)






