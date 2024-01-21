import React from "react";
import {SongTitle} from "atoms/SongTitle"
import {ArtistName} from "atoms/ArtistName"
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <div>
            <a>testing</a>
            <SongTitle></SongTitle>
            
        </div>
    );
};

// App.defaultProps ={
//     isAuth: true,
// }

export { App };