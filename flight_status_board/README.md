# Flight Tracking Application

## Overview

The Flight Tracking Application is a web-based platform built with React and Redux, designed to provide users with real-time flight status information. It allows users to search for flights, view flight details, and navigate through different sections of the application seamlessly.

## Installation and Usage

To run the Flight Tracking Application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd Travelopia_Assignment/flight_status_board
   ```

2. **Install the required packages**:
   ```bash
    npm install
   ```
3. **Run the application**:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3000/`.

4. **Build the application**:

   ```bash
   npm run build
   ```

   The build files will be generated in the `build` folder.

## Project Structure

The project consists of the following main directories and files:

```plaintext
Travelopia_Assignment/
├── flight_status_board/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FlightCard.tsx
│   │   │   ├── FlightTable.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   ├── pages/
│   │   │   ├── FlightDetails.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── History.tsx
│   │   │   ├── Tickets.tsx
│   │   ├── redux/
│   │   │   ├── action.ts
│   │   │   ├── reducer.ts
│   │   │   ├── store.ts
│   │   ├── utils/
│   │   │   ├── formatDate.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   ├── package.json
│   ├── README.md
```

- _src/_: The main source folder containing all application code.
  - _components/_: Contains reusable React components.
    - Navbar.tsx: Navigation bar for the application.
    - Sidebar.tsx: Sidebar for easy navigation between sections.
    - FlightCard.tsx: Displays individual flight information in a card format.
    - FlightTable.tsx: Renders a table view of all available flights.
    - FlightDetails.tsx: Displays detailed information about a specific flight.
  - _redux/_: Contains Redux setup files.
    - action.ts: Defines action types and action creators for updating flight data.
    - reducer.ts: Contains the reducer function to manage flight state.
    - store.ts: Configures and creates the Redux store.
  - _utils/_: Contains utility functions for formatting dates and times.
    - formateDate.ts: Functions to format departure times and dates.
  - App.tsx: Main application component that sets up routing.
  - index.tsx: Entry point of the application.

## Pages and Components

### 1. Navbar

_Purpose_: The Navbar provides a search feature for users to find flights by flight number or airline name.  
_Key Features_:

- Search input that triggers API calls to fetch flight data.
- Displays the search results dynamically as the user types.

### 2. Sidebar

_Purpose_: The Sidebar offers navigation links to different sections of the application, enhancing user experience.  
_Links_:

- _Home_: Redirects to the main flight listing page.
- _History_: Takes users to their flight history (to be implemented).
- _Tickets_: Accesses users’ ticket information (to be implemented).

### 3. FlightCard

_Purpose_: The FlightCard component displays a summary of individual flights.  
_Key Features_:

- Shows the airline, status, origin, destination, and formatted departure time.
- Visual indicators for flight status using colored badges.

### 4. FlightTable

_Purpose_: Renders a table listing all available flights with detailed information.  
_Key Features_:

- Clickable flight numbers redirect users to the FlightDetails page.
- Displays flight number, airline, origin, destination, departure time, and status.
- Color-coded status indicators for better visibility.

### 5. FlightDetails

_Purpose_: Displays detailed information about a selected flight.  
_Key Features_:

- Shows airline name, flight duration, and detailed departure/arrival information.
- Displays a visual representation of the flight route.

## Redux Integration

### State Management

The application uses Redux for state management, facilitating efficient data handling and global state access. The state consists of:

- _Flight Data_: All available flight information.
- _Recent Flight Data_: Recently fetched flight status data.

### Actions

- _SET_FLIGHT_DATA_: Updates the global flight data.
- _SET_RECENT_FLIGHT_DATA_: Updates the recent flight data.

### Action Creators

- dataUpdate(data: dataType[]): Dispatches an action to update flight data.
- currentStatusDataUpdate(data: dataType[]): Dispatches an action to update recent flight data.

### Reducer

The flightStatusReducer function handles actions related to flight data updates and returns the new state accordingly.

### Store Configuration

The Redux store is created using createStore from Redux, applying the flight status reducer to manage the application's state.

## Utilities

- _formateDate.ts_: Contains utility functions for formatting flight departure times and dates, ensuring that the time is displayed in a user-friendly format.

## Conclusion

This Flight Tracking Application effectively combines modern React features with Redux for state management, providing a robust solution for users looking to track flights. Future enhancements could include a detailed history section and ticket management functionalities.
