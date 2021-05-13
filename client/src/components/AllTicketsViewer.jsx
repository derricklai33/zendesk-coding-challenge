import { Link } from 'react-router-dom';

export function AllTicketViewer (props) {
  const { data } = props;
  console.log(data);
  return(
    <>
    <h1>Tickets</h1>
    {data && (
      data.tickets.map((item, index) => {
        return <Link key={index} to={`/${item.id}`}>{item.subject}</Link>
      })
      )}
    </>
  );
}