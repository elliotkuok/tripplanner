import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setItObj } from '../../store/itineraries';
import { Modal } from '../../context/Modal';
import LoginForm from '../SessionForms/LoginForm';
import { useSelector } from 'react-redux';
import { toggleFakeViewsAsync } from '../../store/itineraries';

export default function ItineraryTile({itinerary}){
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState();
    
    const [isLiked, setIsLiked] = useState(itinerary.fakeViews);
    const [fakeLikes, setFakeLikes] = useState(itinerary.fakeLikes);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const loggedIn = useSelector(state => !!state.session.user);

    const handleLikeClick = async () => {
        if (!loggedIn) {
            setShowLoginModal(true);
            return;
        }
        dispatch(toggleFakeViewsAsync(itinerary._id));
        

            // Update fakeLikes in the state (if needed)
            if (isLiked) {
                setFakeLikes(fakeLikes - 1);
            } else {
                setFakeLikes(fakeLikes + 1);
            }
            setIsLiked(!isLiked)
        
    };   

    const handleUse = (itinerary) => {
        dispatch(setItObj(itinerary))
    }

    if(!itinerary.author) return null

    return (
        <>
            <div className='main-itinerary-container'>
                <div className='item'>
                    <div className='itinerary' onClick={() => setIsOpen(!isOpen)}
                            style={{
                                backgroundColor: isOpen || hovered ? "#457B9D" : "#A8DADC",
                                color: isOpen || hovered ? "white" : "#1D3557",
                            }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                        <div className='intinerary-detail-container'>
                            <h3>{itinerary.title}</h3>
                            <div className='itinerary-info'>
                                <h4>{itinerary.length} days</h4>
                                <div className='itinerary-details'>
                                    <div className='itinerary-detail-container'>
                                        <p>By: {itinerary.author ? itinerary.author.username : 'Unknown'}</p>

                                    </div>
                                    <div className='itinerary-detail-container'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16"> <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/> </svg>
                                        <p>{fakeLikes}</p>
                                    </div>
                                </div>
                            </div>          
                        </div>

                        <span className='arrow-icon'>{isOpen ? '\u25b2' : '\u25bc'}</span>
                    </div>


                <div className='itinerary-content' style={{ display: isOpen ? 'block' : 'none' }}>
                    <div className='itinerary-content-container'>                  
                            {itinerary.days.map((day, index) => (
                                <div key={day._id}>
                                    <h3>Day {index + 1}</h3>
                                    <p>
                                        {day.activities &&
                                            day.activities.map(activity => activity.name).join(', ')}
                                    </p>
                                    {/* <p>Accommodation: {day.accommodation}</p> */}
                                </div>
                            ))}
                        <div className='last-buttons'>
                            <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-hand-thumbs-up"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                </svg>
                                {fakeLikes} Likes
                            </button>
                            <Link onMouseDown={()=>handleUse(itinerary)} to={`/itineraries/new/plan`}>Use this itinerary</Link>

                            </div>
                        </div>
                    </div>
                </div>
            <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
                <LoginForm />
            </Modal>
        </div>
        </>
    );
}
