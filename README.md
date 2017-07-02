# Wastewater Treatment Data Map

Hydro data maps all of the wastewater treatment plans in California. Water is a topic of importance in California due to the shortage of availability. The purpose of the project is to make aware of locations of water treamtment plants, what kind of volumes of waste they are taking in and how they help recycle back water into local water districts. There are over 300 plants on the map. Locations and coordinates are taken off of google maps (http://maps.google.com) so the accuracy of lesser known plants may not be accurate. The datasource of this project is the State of California department of Water Resources 2015 Urban Water Management Plan. 

[Depatrment of Water Resources](http://www.water.ca.gov/urbanwatermanagement/uwmp2015.cfm)

# Content

- [Features](#features)
- [Search Function](#searchfunction)
- [Map](#map)
- [Charts](#charts)
- [Datatable](#datatable)
- [Database](#database)
- [Testing](#testing)
- [Technologies Used](#technologiesused)
- [Future to Do List](#todo) 
- [About the Author](#about)



## <a name="features"></a>Features
This website features a map that can be searched for location of treatment plant by city. It will zoom into that location and display an icon marker. You can click on the icon marker to display information of that treatment plant including name, address, total water treated in a year,and total water recycled within and out of district. There are over 300 maker locations at this point.


![Demo](http://i.imgur.com/P4uU5Co.gif)



## <a name="searchfunction"></a>Search Function
The search function features an integrated React component that feeds information to React and vanilla Javascript. It auto corrects user input using a Levenshtien algorithm and passes information needed to render map markers for that area. The datatable also syncs with the search function and it will only render information that pretains to the city search. Finally the "All" button will display all the data points and Water treatment plants in California which you can scroll and zoom using either the map or the datatable. 

## <a name="map"></a>Map
The map is made using Mapbox GL API. It combines open street maps rendered using WebGL engine in real time for smooth loading of tiles. It also allows the upload of custom markers from an image file which can be uploaded using [Mapbox Studio](https://www.mapbox.com/mapbox-studio/). You can click on the icon to display popup information as well as refresh pie chart and bar chart information. 

## <a name="Charts"></a>Charts
The charts were made using Chart.js, a library used to make data visualizations. Pie chart has integration with Mapbox and will update upon clicking the marker. The pie chart displays the percentage of water discharged, water recylcled back into the district and water recycled out of the water district. Data is taken from Urban Water Managment Plan of 2015 reported by treatetment plants. 

## <a name="Datatable"></a>Datatable
The datable was made using react-bootstrap-table. It can be saved into a csv and be filtered out by each of the categories and it can be sorted by each of the columns. The table provides the same data displayed on the map. It renders only the rows that needs to be shown so it is very quick despite having to display lots of data. Each row can be filtered by name, address, city, state, zipcode,location of outfall, and level of treatment. 
  

## <a name="Database"></a>Database
SQLite is used to store database information. The database is taken into Express to create Json data.  The front end calls up data using an API made with Express to get bits of Json data. The frontend API call makes a request for json data and he backend will send it. 


## <a name="testing"></a>Unit Testing
The code has been tested using Mocah/Chai for front end javascript and Jest for the React code. It uses a BDD testing method with set expectations on how the code should run. Unit testing this code is important because of it can uncover bugs during development.

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
- [Mocha](https://mochajs.org/)
- [Chai](http://chaijs.com/)
- [Jest](https://facebook.github.io/jest/)

## <a name="todo"></a>Future To Do List

[] Integration boundry data from each waterdistrict to map out he boundries of each district
[] Write more unit tests using BDD method in order to uncover more bugs with the code.
[] Use POST method to creat and delete database.

## <a name="about"></a>About the Author
This web app was made be Joe Kurokawa, an engineer and a developer. 
- [jkurokawa.com](http://jkurokawa.com)
- [linkedin.com/jkurokawa](https://www.linkedin.com/in/joekurokawa/)
- [github.com/joeysk2012](http://github.com/joeysk2012)






