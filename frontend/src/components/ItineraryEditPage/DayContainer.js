import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ActivityContainer } from './ActivityContainer';
import Search from '../Search/Search';
import { RecommendedActivityTile } from './RecommendedActivityTile';

export function DayContainer({passed, owned, itObj, setItObj, id, day, index, map, setMarkersPositions, markersPositions, setCenter, deleteDay, allDaysOpen}) {
    const [isOpen, setIsOpen] = useState(allDaysOpen);

    const [hovered, setHovered] = useState();    
    
    const [info, setInfo] = useState({});
    const [activities, setActivities] = useState([]);


    useEffect(() => {
        setIsOpen(allDaysOpen);
    }, [allDaysOpen]);
    
    const date = () => {
        let date = new Date(itObj.startDate)
        date.setDate(date.getDate() + index);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0, hence the +1
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    const currentDate = date();


    return (
        <div className='day-container' id={id}>
            <div className='item'>
                <div className='title' onClick={() => setIsOpen(!isOpen)}
                        style={{
                            backgroundColor: isOpen || hovered ? "#457B9D" : "transparent",
                            color: isOpen || hovered ? "white" : "#457B9D",
                          }}
                          onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                    >
                    <div className='day-detail-container'>
                        <h3>Day {index + 1}:  { currentDate ? currentDate : ''} </h3>         
                        <h5>{(itObj.days[index]?.activities.length === 0 || itObj.days[index]?.activities.length === undefined)  ? "" : itObj?.days[index]?.activities?.length + " Place(s)"}</h5>
                    </div>

                    <span className='arrow-icon'>{isOpen ? '\u25b2' : '\u25bc'}</span>
                </div>

                <div className='content' style={{ display: isOpen ? 'block' : 'none' }}>
                    <div className='content-container'>

                        <ActivityContainer owned={owned} passed={passed} dayIdx={index} itObj={itObj} setItObj={setItObj} info={info} setInfo={setInfo} setMarkersPositions={setMarkersPositions} markersPositions={markersPositions} activities={activities} setActivities={setActivities}/>
                        <Search index={index} itObj={itObj} setItObj={setItObj} map={map} setMarkersPositions={setMarkersPositions} markersPositions={markersPositions} setCenter={setCenter} setInfo={setInfo} activities={activities} setActivities={setActivities}/>
                        {!passed() && <button className='remove-day-bttn' onClick={(e) => deleteDay(index, e)}> Remove Day {index + 1} </button>}

                    </div>
                </div>
            </div>
        </div>
    
    )
}