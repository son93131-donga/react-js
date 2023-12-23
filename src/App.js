import React from "react";
import Weather from "./components/weather";
import Form from "./components/form";
import Titles from "./components/titles";

const Api_Key = "9bbe054d017262bbeebf33ca97ba49c8";

class App extends React.Component {

  state = {

    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    temp_max: undefined,
    error: undefined
  }


  getWeather = async (e) => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();   
    try {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
      const response = await api_call.json(); 
      console.log('check response',response)
      if(city && country){
        this.setState({
          temperature: response.main.temp,
          city: response.name,
          country: response.sys.country,
          humidity: response.main.humidity,
          description: response.weather[0].description,
          temp_max: response.main.temp_max,
          error: ""
        })
      }else{
        this.setState({
          error: "Please fill all fields..."
        })
      }
    } catch (error) {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        temp_max: undefined,
        error: "Can not find out this city..."
      })
    }

  }

  render() {

    return (

      <div>
         <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                <Titles />
                </div>
                <div className="col-xs-7 form-container">
                <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    temp_max={this.state.temp_max}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default App;
