import React from "react";
import { SongGrid } from "organisms/SongGrid"

const App = () => {
    return (
        <div>
            <SongGrid></SongGrid>
        </div>
    );

    const handleAddButtonClick = () => {
        console.log('add button')
    }

};


export { App };