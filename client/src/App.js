import React from 'react';
var ReactBsTable =require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import '../public/css/react-bootstrap-table.css';
import ReactModal from 'react-modal';
import Client from './Client';
import Search from './Search';
import Topnav from './Topnav';
var cityData = require('./data/citydata');
var levenshtein = require('fast-levenshtein');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal1: false,
      posts: [],
      city: 'all'

    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal1 = this.handleOpenModal1.bind(this);
    this.handleCloseModal1 = this.handleCloseModal1.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCityAll=this.handleCityAll.bind(this);

  }

   componentDidMount() {
     Client.search('all', (data) => {
      this.setState({
        posts: data.wwtp
      });
    });
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleOpenModal1 () {
    this.setState({ showModal1: true });
  }

  handleCloseModal1 () {
    this.setState({ showModal1: false });
  }

  handleCityChange(city){
    var correctCity={}
    function servCityData(input){
      var mty=[]
      var srv=cityData.filter(function(line){
        var inputValue=line.name.toLowerCase().replace(/\s/g, '')
        var outputValue=input.toLowerCase().replace(/\s/g, '')
        if(levenshtein.get(inputValue,outputValue) < 3)
        return line
        })

        for(var i=0 ; i<srv.length ; i++){
          mty.push(levenshtein.get(srv[i].name, input))
        }

        var minIndex=0
        for (i =1; i <mty.length; i++){
          if(mty[i] < mty[0]){
            minIndex= i;
          }
        }
        return srv[minIndex]
    }
  correctCity=servCityData(city)
  city=correctCity.name

   this.setState({city});
    Client.search(city, (data) => {
     this.setState({
       posts: data.wwtp
     });
   });
  }

  handleCityAll(city){
    Client.search(city, (data) => {
     this.setState({
       posts: data.wwtp
     });
   });
  }

createCustomButtonGroup = props =>{
  return (
    <div className='btn-group'>
      {props.exportCSVBtn}
        <button onClick={this.handleOpenModal} className={'btn btn-info' }>
          Info
        </button>
        <button onClick={this.handleOpenModal1} className={'btn btn-basic' }>
          Share
        </button>
        </div>
        );
    }

  render() {

    const mods = {
        page: 1,
        sizePerPageList: [{text: '10', value: 10 },{text: '20', value: 20},
        {text: '50', value: 50},{text: '100', value: 100}],
        sizePerPage: 50,
        pageStartIndex: 1,
        paginationSize: 5,
      };

    const filterMod={
      type: 'TextFilter', delay: 10};

    const buttonMod={
      btnGroup: this.createCustomButtonGroup,
      page: 1,
      sizePerPageList: [{text: '10', value: 10 },{text: '20', value: 20},
      {text: '50', value: 50},{text: '100', value: 100}],
      sizePerPage: 50,
      pageStartIndex: 1,
      paginationSize: 5,
    };

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto%',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        border                : '5px solid #0080FF',
        borderRadius          : '4px',
        padding               : '20px'
      }
    };


    return(
      <div>
      <Topnav />
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        style={customStyles}>
          <h2>Info</h2>
          <p>This is a mapping of listed wastewater treatment plants in California</p>
          <p>taken from State of California Department of Water Resrouces.</p>
          <p>2015 Urban Water Managment Plans.</p>
          <p>The locations and addresses of listed plants are taken off of google maps and</p>
          <p>and could vary from actual local,county, and city records.</p>
          <p>Due to facing water shortages in the state this website is an attempt to raise awareness on</p>
          <p>where your local water goes and how much is recycled back into our cities and towns.</p>
          <p>Please use the search tool to find a city and click on the markers to get more information. </p>
          <br />
          <h4>-Joe Kurokawa </h4>
          <a href="http://github.com/joeysk2012">Visit my Github</a>
          <br />
          <br />
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>

      <ReactModal
       isOpen={this.state.showModal1}
       contentLabel="onRequestClose Example"
       onRequestClose={this.handleCloseModal1}
       style={customStyles}>
        <h2>Share</h2>
        <p>Please share this with friends!</p>
        <a href="http://wastewater-data.com">wastewater-data.com</a>
        <br />
        <h4>Designed by Joe Kurokawa </h4>
        <button onClick={this.handleCloseModal1}>Close Modal</button>
      </ReactModal>

      <Search onCityChange={this.handleCityChange} onCityAll={this.handleCityAll} />
      <BootstrapTable ref='table' data={this.state.posts} maxHeight='500px' exportCSV pagination={true} scrollTop={'Top'}
      options={buttonMod} >
        <TableHeaderColumn width='200' dataField='name' isKey dataSort filter={filterMod}>{"Name"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='address' dataSort filter={filterMod}>{"Address"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='city'dataSort filter={filterMod}>{"City"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='state' dataSort filter={filterMod}>{"State"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='zip' dataSort filter={filterMod}>{"Zipcode"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='outfall' dataSort filter={filterMod}>{"Outfall"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='level' dataSort filter={filterMod}>{"Level of Treatment"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='total' dataSort={true}>{"Total (MGAL)"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='discharge'dataSort={true}>{"Discharged (MGAL)"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='recycled_in_area'dataSort={true}>{"Recycled in area (MGAL)"}</TableHeaderColumn>
        <TableHeaderColumn width='200' dataField='recycled_out_area' dataSort={true}>{"Recycled out of area (MGAL)"}</TableHeaderColumn>
      </BootstrapTable>
    </div>

    );
  }
}




export default App;
