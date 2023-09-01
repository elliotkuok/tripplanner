import React from 'react';
import { useState, useRef, useEffect } from "react";
import './ItineraryEditPage.css';
import Search from '../Search/Search';
import { DayContainer } from './DayContainer';
import {useJsApiLoader, GoogleMap, Marker, Autocomplete, setZoom, DirectionsRenderer, InfoWindow} from '@react-google-maps/api';
import MarkerInfoWindow from '../Maps/MarkerInfoWindow';
import './Maps.css'


import { ExploreActivitiesTile } from './ExploreActivitiesTile';
import './NestedComponents.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { fetchItinerary } from '../../store/itineraries';


const ItineraryEditPage = () => {
    const dispatch = useDispatch()
  
    const days = [
            { date: "Saturday, September 9th", places: 5 },
            { date: "Sunday, September 10th", places: 3 },
            { date: "Monday, September 11th", places: 2 },
            { date: "Tuesday, September 12th", places: 4 },
            { date: "Wednesday, September 13th", places: 4 },
        ];

    const [markersPositions, setMarkersPositions] = useState([]);
    
    const [itObj, setItObj] = useState(null)
    const {itineraryId} = useParams()
    useEffect(() =>{
        if(itineraryId){
            let it = async () => {
                const res = await dispatch(fetchItinerary(itineraryId))
                setItObj(() => res)
            }
            it()
            console.log(itObj)
        }
    },[itineraryId])
    
    const splashLat = itObj?.lat
    const splashLng = itObj?.lng
    const splashPos = {
        lat: splashLat ?? 37.4245,
        lng: splashLng ?? -122.0782
    };
    // const init = splashPos ?  splashPos : {lat: 37.4245, lng: -122.0782}

    console.log(splashPos)


    const [center, setCenter] = useState(splashPos)


    console.log(itObj?.locationName)
    // console.log(typeof itObj.lng)


        
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries: ['places'],
    })
    

    const [map, setMap] = useState(null);
    
    
    const onLoad = (location) => {
        setMap(location)
    }
    
    useEffect(() => {
        // If there are no markers, geocode the location
        if (map && !markersPositions.length && itObj?.locationName) {
            let geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ 'address': itObj.locationName }, (results, status) => {
                if (status === window.google.maps.GeocoderStatus.OK) {
                    map.fitBounds(results[0].geometry.viewport);
                }
            });
        } 
        // else {map?.setZoom(10)}
    }, [itObj?.locationName, map, markersPositions.length]);
    
    useEffect(() => {
        if (map && markersPositions.length > 0) {
            let bounds = new window.google.maps.LatLngBounds();
            markersPositions.forEach(place => {
                bounds.extend(new window.google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()));
            });
            map.fitBounds(bounds);

            let latSum = 0;
            let lngSum = 0;
            markersPositions.forEach(place => {
                latSum += place.geometry.location.lat();
                lngSum += place.geometry.location.lng();
            });
            setCenter({
                lat: latSum / markersPositions.length,
                lng: lngSum / markersPositions.length
            });

        }
    }, [markersPositions, map]);
    
    
    
    
    if (!isLoaded) {return (<div>Loading...</div>)}
    if(!itObj) return null
    
    return ( 
        <div className='page-content-container'>
        <div id='itinerary-section-container'>
            <div id='sidebar'>Sidebar</div>
            <div id='itinerary-section-content'>
                <div id='itinerary-tld'>
                    <div id='title-date-container'>
                        <h1>{itObj.title}</h1>
                        <div>9/9 - 9/16</div>
                    </div>
                    <div id='itinerary-tld-bttns'>
                        {/* <button>Share</button> */}
                        <div></div>
                        <div id='members-container'>
                            <div id='member-icon'>E</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16"> <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/> </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='popular-activities-section'>
                    <div id='activity-list'>
                        <h2>Top locations for {itObj.locationName}</h2> 
                        
                        <div id='popular-activities-container'>
                            <ExploreActivitiesTile />
                            <ExploreActivitiesTile />
                            <ExploreActivitiesTile />
                            <ExploreActivitiesTile />
                            <ExploreActivitiesTile />
                            <ExploreActivitiesTile />
                        </div>
                    </div>
                </div>
                <div id='itinerary-container'>
                    <div id='itinerary-header'>
                        <h2>Itinerary</h2>

                        {/* <Search map={map} setMarkersPositions={setMarkersPositions} markersPositions={markersPositions} setCenter={setCenter}/> */}
                        
                        <a>Collapse All</a>
                        {/* <a>Collapse All</a> */}
                    </div>
                    <div id='itineary-days-container'>
                        {days.map((day, index) => (
                            <DayContainer key={index} day={day} index={index} map={map} setMarkersPositions={setMarkersPositions} markersPositions={markersPositions} setCenter={setCenter} />
                            ))}
                    </div>
                </div>
            </div>

        </div>
        
            {/* <Search map={map} setMarkersPositions={setMarkersPositions} markersPositions={markersPositions} setCenter={setCenter}/> */}
            {/* <Search map={map} setMarkersPositions={setMarkersPositions} markersPositions={markersPositions}/> */}
            <div id='sticky'>

            <GoogleMap 
            onLoad={onLoad}
            // ref={mapRef}
            center={center}
            // zoom={7}
            mapContainerClassName="map-container"
            >
                {/* <Marker position={center} /> */}
                {/* <Marker position={{lat:37.96, lng:-122.0296}} /> */}
                {markersPositions.map((place, idx) => <MarkerInfoWindow key={idx} place={place} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />)}
                {/* <InfoWindow /> */}
            </GoogleMap>
            </div>
    </div>
    )
}    

    export default ItineraryEditPage;