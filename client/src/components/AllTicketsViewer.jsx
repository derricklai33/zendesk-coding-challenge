import React, { useState } from "react";
import { Link } from "react-router-dom";

export function AllTicketViewer(props) {
  const { data } = props;
  const [pages, setPages] = useState(0);

  return (
    <>
      <h1>All Tickets</h1>
      <div className={"ticket-viewer-div"}>
        {data &&
          (data.tickets.length > 0 ? (
            data.tickets[pages].map((item, index) => {
              return (
                <Link key={index} to={`/${item.id}`}>
                  {`${item.id}. ${item.subject}`} <br />
                </Link>
              );
            })
          ) : (
            <h2>{data.error}</h2>
          ))}
        {data && data.tickets.length > 0 && (
          <>
            {pages !== 0 ? (
              <button
                onClick={() => {
                  setPages(pages - 1);
                }}
              >
              {"<"}
              </button>
            ) : (
              <button disabled={true}> {"<"}</button>
            )}
            {pages + 1}
            {pages === data.tickets.length - 1 ? (
              <button disabled={true}>{">"}</button>
            ) : (
              <button
                onClick={() => {
                  setPages(pages + 1);
                }}
              >
              {">"}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
