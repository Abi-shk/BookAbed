import axios from 'axios';

const clientId = 'xfP5absRlbBi1oQRWWQd48uvdeXoaiwE';
const clientSecret = 'bOAO6f3xru5o4HW6';

let accessToken = null;

export const getAccessToken = async () => {
    const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
        const response = await axios.post(url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null;
    }
};

export const fetchFlightOffers = async (fromValue, toValue, departureDate, returnDate, adults, children, infants) => {
    if (!accessToken) {
        accessToken = await getAccessToken();
    }

    if (!accessToken) return;

    const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
    const params = {
        currencyCode: 'INR',
        originDestinations: [
            {
                id: '1',
                originLocationCode: fromValue,
                destinationLocationCode: toValue,
                departureDateTimeRange: {
                    date: departureDate
                }
            },
            ...(returnDate ? [{
                id: '2',
                originLocationCode: toValue,
                destinationLocationCode: fromValue,
                departureDateTimeRange: {
                    date: returnDate
                }
            }] : [])
        ],
        travelers: [
            ...Array(adults).fill({ travelerType: 'ADULT' }).map((traveler, index) => ({ ...traveler, id: (index + 1).toString() })),
            ...Array(children).fill({ travelerType: 'CHILD' }).map((traveler, index) => ({ ...traveler, id: (adults + index + 1).toString() })),
            ...Array(infants).fill({ travelerType: 'INFANT' }).map((traveler, index) => ({ ...traveler, id: (adults + children + index + 1).toString() }))
        ],
        sources: ['GDS']
    };

    try {
        const response = await axios.post(url, params, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching flight offers:', error);
        if (error.response && error.response.status === 401) {
            // Token might be expired, try getting a new one and retry
            accessToken = await getAccessToken();
            return fetchFlightOffers(fromValue, toValue, departureDate, returnDate, adults, children, infants); // retry
        }
    }
};

export const fetchHotelOffers = async (cityCode, checkInDate, checkOutDate, adults) => {
    if (!accessToken) {
        accessToken = await getAccessToken();
    }

    if (!accessToken) return;

    const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=25&radiusUnit=KM&amenities=SWIMMING_POOL,SPA,FITNESS_CENTER,AIR_CONDITIONING,CASINO,JACUZZI,MASSAGE,BAR,MINIBAR&hotelSource=ALL`;
    const params = {
        cityCode,
        checkInDate,
        checkOutDate,
        roomQuantity: 1,
        adults,
        currency: 'INR',
    };

    console.log('Fetching hotels with parameters:', params);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching hotel offers:', error);
        if (error.response && error.response.status === 401) {
            // Token might be expired, try getting a new one and retry
            accessToken = await getAccessToken();
            return fetchHotelOffers(cityCode, checkInDate, checkOutDate, adults); // retry
        }
    }
};

