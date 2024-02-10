import React from 'react'
import './index.css'

const SearchLetter = ({letter, onClick}) => {
    return (
        <div>
            <button className='letter-button' onClick={() => onClick(letter)}>{letter}</button>
        </div>
    )
}

export {SearchLetter}