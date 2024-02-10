import React from "react";
import {SearchLetter} from 'atoms/SearchLetter'
import './index.css'

const SearchLetterArray = ({onClick}) => {
    const UpperCaseAlp = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"];

    const Alphabet = UpperCaseAlp.map((letter, i) =>
        <SearchLetter letter={letter} onClick={() => onClick(letter)}></SearchLetter>
    );

    return (
        <div className="alphabet">
            {Alphabet}
        </div>
    )
}
export {SearchLetterArray}