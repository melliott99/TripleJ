import React, { useState, useEffect } from "react";
import { SelectedSongCard } from "molecules/SelectedSongCard"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.css'


const SongList = ({Songs, onRemoveSong, onDragSong}) => {

    const handleRemoveSong = (song) =>{
        onRemoveSong(song);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
    
        const newSongsOrder = Array.from(Songs);
        const [removed] = newSongsOrder.splice(result.source.index, 1);
        newSongsOrder.splice(result.destination.index, 0, removed);
    
        onDragSong(newSongsOrder);
      };

    const SongList = (
        <div id="DroppableArea">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="DroppableArea">
                    {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {Songs.map((song, index) => (
                        <Draggable key={song.trackId} draggableId={song.trackId} index={index}>
                            {(provided) => (
                            <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <SelectedSongCard 
                                    index={index} 
                                    trackId={song.trackId}
                                    song={song.songName} 
                                    artist={song.artist} 
                                    trackImg={song.trackImg} 
                                    onAddButtonClick={() => handleRemoveSong(song)}
                                ></SelectedSongCard>
                            </li>
                            )}
                        </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                    )}
                </Droppable>
                </DragDropContext>
            
        </div>
    );

    return (
        <div className="song-list-container">
            {SongList}
        </div>
    );

};

export { SongList }