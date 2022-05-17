## Introduction
Flight systems are very complicated nowadays, and for sure they are
very important.
To build API for these systems you must understand some general
concepts.

- `One-way flight`: A one-way flight allows you to travel only to your destination, without returning.
- `Round flight`: A round-trip flight is a flight itinerary that includes one flight to a destination and another flight back from that destination, such as flying from NYC to Paris and then Paris back to NYC.
- `Itinerary`: It’s the full route of the journey so if your flight is one-way from Cairo to Paris then this an itinerary. But if your flights is a round trip so you go from Cairo to Paris and then after some time you return to Cairo, then this full journey Cairo - Paris , Paris - Cairo is an itinerary.
- `Leg`: it’s the path of the flight, so if your are going on a one way trip from Cairo to Paris then you have one leg which is Cairo - Paris. But if you are going to a round trip, then you will have two legs, the first is Cairo - Paris and the second is Paris - Cairo.
- `Segment`: it’s the stop-points. When you travel from point to point, the plane might first land on an external point so it get some fuels or even to change the plane. For example: Cairo - Athena - Paris. This is a flight from Cairo to Paris but the plane will first land on Athena airport and the passengers will change the plane.

## Gateway
An API that takes an input data and returnes the top 5 cheapest flight tickets:
- `POST`: xxx.domin.xxx/search
- `GET`: not provided

## Json Acceptance Criteria

### Search
Each URL request should have the following options:
- `from`: Origin airport like CAI *three letters (required)*.
- `to`: Destination airport like LHR *three letters (required)*.
- `tripType` Trip type *(required)*:
    - `1` => oneway.
    - `2` => round.
- `departure`: Departure date (YYYY-MM-DD) *(required)*.
- `arrival`: Arrival date (YYYY-MM-DD), when `tripType` is:
    - `1` => the parameter is *(optional)*.
    - `2` => the parameter is *(required)*.
- `cabinClass` Flight cabine class *(required)*.
    - `1` => Economy
    - `2` => Business
    - `3` => First
- `country`: User country code *two letters (required)*.
- `currency`: User country currency *three letters (required)*.
- `adults` Number of adults *(required)*.
- `children`: Number of children *(required)*.
- `infants`: Number of infants *(required)*.
- `visitorId`: A UUIDv4 string E.g `fabeff1a-adfa-40e2-b77d-db2038036dc2` *(optional)*.

## Json Response Criteria

### Response

Each completed response should have the following options:
- `tickets[]`: list of the following object:
    - `origin`: Origin airport like CAI *(three letters)*.
    - `destination`: Destination airport like LHR *(three letters)*.
    - `price`: Ticket price.
    - `currency`: Currency code *(three letters)*
    - `deepLink`: Base64 string contains the provider's data
    - `legs[]`: List of the following object:
        - `id`
        - `origin`
        - `destination`
        - `departure`
        - `arrival`
        - `duration`
        - `segments[]`: List of the following object:
            - `id`
            - `origin`
            - `destination`
            - `departure`
            - `arrival`
            - `duration`

## Issues
- `The server hangs`: The server may take up to 30s waiting the completed flag from the end-point.
    - `Possible solution`: Request an id to track the request intermittently.

## Setup
We use npm package manager
- Install node dependencies `$ npm install`
- Edit **.env** file to fit your workplace.
- Run the system `$ npm start`, you will see a output telling you that the server is running.
