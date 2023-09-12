import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TripTile({trip}) {

    const { startDate, length, _id } = trip;
    const start = new Date(startDate);

    const end = new Date(startDate);
    end.setDate(end.getDate() + length - 1);

    const formattedStartDate = formatDate(start);
    const formattedEndDate = formatDate(end);

    function formatDate(dateObj) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    }

    return (
        <Link to={`/itineraries/${_id}/plan`}>
            <div className='trip-container'>
                <div className='trip-img-container'>
                    <img></img>
                </div>
                <div className='trip-details'>
                    <h4>{trip.title}</h4>
                    <p>{`${formattedStartDate} - ${formattedEndDate}`}</p>
                </div>
            </div>
        </Link>
    );
}
