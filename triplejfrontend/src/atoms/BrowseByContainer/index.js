import React from "react";
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const BrowseBy = ({icon, searchType, onClick, modeType}) => {


    return (
        <div className="search-container">
            <button className="search-button" onClick={() => onClick(modeType)}>
                <FontAwesomeIcon icon={icon} />
                <a></a>&nbsp;{searchType}
            </button>
        </div>
    )
};

export {BrowseBy}