import React from 'react'

const MapSection = () => {
  return (
    <section className="map-section">
      <div className="row">
      <div className="row-fluid" id="map-container">
        <div className="col-sm-8">
          <div id='map'></div>
        </div>
        <div className="col-sm-3">
            <div className="row-fluid">
              <div className="col-sm-12">
              <div id="piechart">
                <canvas id="myChart" height="300" width="100%"></canvas>
              </div>
            </div>
            <div className="row-fluid">
                <div className="col-sm-10 col-sm-offset-1">
              <div id="barchart">
                <canvas id="myChart1" height="300" width="100%"></canvas>
              </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default MapSection;