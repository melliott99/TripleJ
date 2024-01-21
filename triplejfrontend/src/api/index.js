const API_BASE_ADDRESS = "https://localhost:7216";

export default class Api {
    static getWeatherForecast() {
        const uri = API_BASE_ADDRESS + "/WeatherForecast"
        return fetch(uri, {
            method: 'GET',
        });
    }
}