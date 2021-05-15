import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function TicketViewer(props) {
  const [data, setData] = useState();

  useEffect(() => {
    fetchSpecificTicket(props.match.params.id)
  }, [props.match.params.id])
  async function fetchSpecificTicket(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_API_URL}/tickets/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Ticket #{props.match.params.id}</h1>
      <Link to="/">{`< Back`}</Link>
      {data &&
        (data.error === "" ? (
          <>
            <h1>{data.ticket.subject}</h1>
            <h4>{`Submitted by: ${data.ticket.submitter_id}`}</h4>
            <p>{data.ticket.description}</p>
          </>
        ) : (
        <h2>{data.error}</h2>
        ))}
    </>
  );
}
