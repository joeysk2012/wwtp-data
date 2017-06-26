import React from 'react';
var ReactBsTable =require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import '../public/css/react-bootstrap-table.css';
import ReactModal from 'react-modal';
import Client from './Client'
import Search from './Search'


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
        <button type='button'
          className={'btn btn-info' }>
          Leave Feedback
        </button>
        </div>
        );
    }

  render() {



    const mods = {
        page: 1,
        sizePerPageList: [{text: '10', value: 10 },{text: '20', value: 20},
        {text: '50', value: 50},{text: '100', value: 100},{text: 'All', value:this.state.posts}],
        sizePerPage: 10,
        pageStartIndex: 1,
        paginationSize: 5,
      };



    const filterMod={
      type: 'TextFilter', delay: 10};
    const buttonMod={
      btnGroup: this.createCustomButtonGroup,

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

    const city=this.state.city;

    return(
      <div>

      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        style={customStyles}>
          <h2>Info</h2>
          <p>This is a mapping of all wastewater treatment plans in California</p>
          <p>taken from State of California Department of Water Resrouces.</p>
          <p>2015 Urban Water Managment Plans. In an attempt to track where</p>
          <p>your Wastewater goes in your city and towns. Please use the search tool to</p>
          <p>find a city and click on the markers to get more information.</p>
          <h4>-Joe Kurokawa </h4>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>

      <ReactModal
       isOpen={this.state.showModal1}
       contentLabel="onRequestClose Example"
       onRequestClose={this.handleCloseModal1}
       style={customStyles}>
        <h2>Share</h2>
        <p>Please share this with friends!</p>
        <a href="http://hydro-data.herokuapp.com">hydro-data.herokuapp.com</a>
        <h4>Designed by Joe Kurokawa </h4>
        <button onClick={this.handleCloseModal1}>Close Modal</button>
      </ReactModal>

      <Search onCityChange={this.handleCityChange} onCityAll={this.handleCityAll} />
      <BootstrapTable ref='table' data={this.state.posts} maxHeight='500px' exportCSV pagination={true}  options={mods} scrollTop={'Top'}
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
