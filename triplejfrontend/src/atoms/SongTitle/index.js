import React, {useState, useEffect} from "react";
import Api from "api"

const SongTitle = () => {
    const [weatherData, setWeather] = useState([]);

    useEffect(() => {
        Api.getWeatherForecast().then((response) =>
            response.json().then((data) => setWeather(data))
        );
    },[])

    // Function to create table rows for each weather item
    const renderWeatherRows = () => {
        return weatherData.map((weather, index) => (
        <tr key={index}>
            <td>{weather.date}</td>
            <td>{weather.temperaturec}</td>
            {/* <td>{weather.summaries}</td> */}
        </tr>
        ));
    };

    return (
        <div>
            <a>SongTITle</a>
            <div>
                <h1>Weather Data Table</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>temperaturec (°C)</th>
 
                    </tr>
                    </thead>
                    <tbody>
                    {renderWeatherRows()}
                    </tbody>
                </table>
                </div>
            </div>
    );
};

export {SongTitle}