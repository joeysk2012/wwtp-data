import React from 'react';
import PropTypes from 'prop-types';



class Search extends React.Component {
  constructor(props) {
    super(props);
      this.state={city: 'all'}
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAll=this.handleAll.bind(this);
  }

  handleSubmit(e){
      e.preventDefault();
     var cityName=this.state.city
      this.props.onCityChange(cityName)
        }


  handleChange(e){
    this.setState({city:e.target.value})
  }

  handleAll(e){
    e.preventDefault();
    this.setState({city : 'all'}, function () {
      var cityName=this.state.city
      this.props.onCityAll(cityName)
    })
  }

 render(){
   const city=this.props.city
   return(
     <div className="search-bar">
      <form onSubmit={this.handleSubmit}>
        <label>
          Search a city:
          <input className="form-control" type="text" value={city} onChange={this.handleChange} id="bar" />
         </label>
        <button className="btn btn-info" id="fly">submit</button>
       <button className="btn btn-secondary" type="button" onClick={this.handleAll}>all</button>
      </form>
     </div>
    )

    }

  }
  Search.propTypes = {
    onCityChange: React.PropTypes.func.isRequired,

}

  export default Search;
