import React, { useEffect } from 'react';
// import Search from '../Search/Search';
// import { useState } from 'react';
export function ActivityContainer({dayIdx, itObj, setItObj,infoIsOpen, setInfoIsOpen,info, setInfo, setMarkersPositions, markersPositions, activities, setActivities}) {

    // console.log('info', info)

    const addActivityInfo = () => {
        if (info.name) {
            const newActivity = {
                name: info.name,
                formatted_address: info.formatted_address,
                formatted_phone_number: info.formatted_phone_number,
                place_id: info.place_id,
                rating: info.rating,
                user_ratings_total: info.user_ratings_total,
                imageUrl: info?.photos?.[0].getUrl(),
                lat: info.geometry.location.lat(), 
                lng: info.geometry.location.lng() 
            };

            // Update local activities state
            setActivities(prevActivities => [...prevActivities, newActivity]);

            // Update itObj
            let obj = { ...itObj, days: [...itObj.days] };
            obj.days[dayIdx] = { ...obj.days[dayIdx], activities: [...(obj.days[dayIdx]?.activities || []), newActivity] };
            setItObj(obj);
        }
    }

    
    useEffect(() => {
        addActivityInfo();
        // console.log("add activity info")
    }, [info]);
    
    const clear = (idx, e) => {
        e.preventDefault();
        
        // Logic for removing an activity
        let obj = { ...itObj, days: [...itObj.days] };
        obj.days[dayIdx].activities = obj.days[dayIdx].activities.filter((_, activityIdx) => activityIdx !== idx);
        
        setItObj(obj);
        
        // Logic for removing a marker
        let updatedMarkers = [...markersPositions];
        updatedMarkers.splice(idx, 1);
        setMarkersPositions(updatedMarkers);
    }
    // console.log('activity', info)

    function setComment(day, act, comment, e){
        if(e){
            e.preventDefault()
        }
        let newItObj = {...itObj}
        newItObj.days[day].activities[act].comment = comment
        setItObj(newItObj)
    }

    function handleTextareaChange(e, dayIdx, idx) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    
        setComment(dayIdx, idx, e.target.value);
    }     
    
    return (
        <div className='activities-container'>
            {(itObj.days[dayIdx]?.activities || []).map((activity, idx) => (
                <div key={idx} className='activity-container'>
                    <div>
                        <h4>{idx+1}</h4>
                    </div>
                    <div className='activity-content'>
                        <div className='activity-google-data'>
                            <div className='img-container'>
                                { activity?.name && <img src={activity?.imageUrl}/>}

                            </div>
                                <div className='activity-description'>
                                    <h3>{activity?.name}</h3>
                                    <p>{activity?.formatted_address}</p>
                                    <p>{activity?.formatted_phone_number}</p>
                                    {activity?.rating && <p>Rating: {activity?.rating}({activity?.user_ratings_total})</p>}
                                    {activity?.name && <button onClick={(e) => clear(idx, e)}> Delete Activity</button>}
                                </div>
                        </div>
                        <div className='comment-holder'>
                            <textarea 
                                placeholder='Add any activity notes here' 
                                onChange={(e) => handleTextareaChange(e, dayIdx, idx)} 
                                style={{overflowY: 'hidden'}} 
                                value={itObj.days[dayIdx].activities[idx].comment} 
                            />
                            {itObj.days[dayIdx].activities[idx].comment && <button className='remove-comment-button' onClick={(e)=> setComment(dayIdx, idx, "", e)}>Clear note</button>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
