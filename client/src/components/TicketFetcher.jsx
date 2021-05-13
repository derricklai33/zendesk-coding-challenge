import React, { useState, useEffect } from 'react';
import { AllTicketViewer } from './AllTicketsViewer';
import { TicketViewer } from './TicketViewer';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export function TicketFetcher () {
  const [ data, setData ] = useState();

  useEffect(() => {
    fetchTickets();
  }, [])

  async function fetchTickets () {
    try{
      const response = await axios.get(`${process.env.REACT_APP_NODE_API_URL}/tickets`)
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <AllTicketViewer data={data} />
        </Route>
        <Route exact path='/:id' render={(props) => <TicketViewer {...props} /> } />
      </Switch>
    </Router>
  );
}