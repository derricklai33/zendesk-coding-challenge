import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function TicketViewer(props) {
  const [ data, setData ] = useState();

  useEffect (() => {
    fetchSpecificTicket(props.match.params.id)
  }, [])

  async function fetchSpecificTicket(id) {
    try{
      const response = await axios.get(`${process.env.REACT_APP_NODE_API_URL}/tickets/${id}`);
      console.log(response.data)
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>
      <h1>Ticket number {props.match.params.id}</h1>
      {data && (
      <>
        <h1>{data.ticket.subject}</h1>
        <p>{data.ticket.description}</p>
      </>
      )}
    </>
  )
}