import jwtFetch from './jwt';

const RECEIVE_ITINERARIES = "itineraries/RECEIVE_ITINERARIES";
const RECEIVE_ITINERARY = "itineraries/RECEIVE_ITINERARY";
export const SET_IT_OBJ = 'itineraries/SET_IT_OBJ'

const receiveItineraries = itineraries => ({
    type: RECEIVE_ITINERARIES,
    itineraries
});

const receiveItinerary = itinerary => ({
    type: RECEIVE_ITINERARY,
    itinerary
});

export const fetchItineraries = location => async dispatch => {
    try {
        const res = await jwtFetch(`/api/itineraries?location=${location}`);
        const itineraries = await res.json();
        dispatch(receiveItineraries(itineraries));
    } catch (err) {
        console.error('Error fetching itineraries:', err);
    }
};

export const fetchUserItineraries = userId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/itineraries/user/${userId}`);
        const itineraries = await res.json();
        dispatch(receiveItineraries(itineraries));
    } catch (err) {
        console.error('Error fetching itineraries:', err);
    }
}

export const fetchItinerary = itineraryId => async dispatch => {
    try{
        const res = await fetch(`/api/itineraries?itineraryId=${itineraryId}`)
        const itinerary = await res.json();
        await dispatch(receiveItinerary(itinerary));
        return itinerary;
    } catch (err){
        console.error('Error fetching itinerary', err)
    }
}

export const fetchItineraryByTitle = title => async dispatch => {
    try {
        const encodedTitle = encodeURIComponent(title); // Encode the title
        const res = await fetch(`/api/itineraries/title/${encodedTitle}`);
        const itinerary = await res.json();
        await dispatch(receiveItinerary(itinerary));
        return itinerary;
    } catch (err) {
        console.error('Error fetching NY itinerary', err);
    }
};


export const createItinerary = data => async dispatch => {
    try{
        const res = await jwtFetch(`/api/itineraries/`, {
            method: "POST",
            body: JSON.stringify(data)
        });
        const itinerary = await res.json();
        dispatch(receiveItinerary(itinerary))
        return itinerary
       
    } catch (err){
        console.error('Error creating itinerary', err)
    }
}

export const updateItinerary = itineraryData => async dispatch => {
    try{
        const res = await jwtFetch(`/api/itineraries/${itineraryData._id}`, {
            method: "PATCH",
            body: JSON.stringify({update: itineraryData})
        });

        if(!res.ok) {
            throw new Error(`cannot update itinerary. Status code : ${res.status}`)
        }


        const itinerary = await res.json();
        dispatch(receiveItinerary(itinerary))
       
    } catch (err){
        console.error('Error fetching itinerary', err)
    }
}


// Thunk action to toggle fakeViews (like/unlike)
export const toggleFakeViewsAsync = (itineraryId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/itineraries/${itineraryId}/fakeviews`, {
            method: 'PATCH',
        });

    } catch (err) {
        console.error('Error toggling fakeViews:', err);
    }
};


export const deleteItinerary = itineraryId => async dispatch => {
    try{
        const res = await jwtFetch(`/api/itineraries/${itineraryId}`, {
            method: 'DELETE'
        })
        return await res.json()
    }catch(err){
        console.error('Error deleting itinerary', err)
    }
}


export const setItObj = itinerary => ({
    type: SET_IT_OBJ,
    itinerary
}
)
const itinerariesReducer = (state = {
    all: {},
    itObj: {}
}, action) => {

    let nextState;

    switch (action.type) {
        case RECEIVE_ITINERARY:
            return {...state, all: {...state.all, [action.itinerary._id]: action.itinerary}}
        case RECEIVE_ITINERARIES:
            nextState = {
                all: {},
                itObj: {}
            };
            action.itineraries.forEach( itinerary => {
                nextState.all[itinerary._id] = itinerary
            })
            return nextState;
        case SET_IT_OBJ:
            nextState = {...state};
            nextState.itObj = action.itinerary
            return nextState
        default:
            return state;
    }
};

export default itinerariesReducer;
