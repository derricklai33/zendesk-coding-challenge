const axios = require("axios"); 

// GET controller for all available tickets
async function getAllTickets(_req, res) {
  const ticketsPerPage = 25;
  let data = {tickets: [], error: ""};
  let url = `https://derricklai-zendesk-challenge.zendesk.com/api/v2/tickets.json`;
  try {
    do {
      const responseData = await axiosGetFunction(url)
      data.tickets = [...data.tickets, ...responseData.data.tickets];
      url = responseData.data.next_page;
    } while (url !== null);
    data.tickets = setTicketsToChunks(data.tickets, ticketsPerPage)
  } catch (error) {
    console.log(error.message);
    data.error = errorMessages(error.response.status);
  } finally {
    res.send(data);
  }
}

// GET controller for specific ticket based on id
async function getSpecificTickets(req, res) {
  let data = {ticket: {}, error: ""};
  let url = `https://derricklai-zendesk-challenge.zendesk.com/api/v2/tickets/${req.params.ticket_id}.json`;
  try {
    const responseData = await axiosGetFunction(url)
    data.ticket = responseData.data.ticket;
  } catch (error) {
    console.log(error.message)
    data.error = errorMessages(error.response.status);
  } finally {
    res.send(data);
  }
}

/* ----------- Start Helper Functions ------------------ */
// GET function using axios
async function axiosGetFunction(url, zendeskUsername, zendeskPassword) {
  let result = {};
  result = await axios.get(url, {
    auth: {
      username: zendeskUsername || process.env.LOGIN,
      password: zendeskPassword || process.env.PASSWORD,
    },
  })
  return result
}

// Sets tickets to be chunks of 25 a.k.a pagination manually
function setTicketsToChunks(ticketArray, chunkSize) {
  let array = [];
  while(ticketArray.length) {
    array.push(ticketArray.splice(0, chunkSize))
  }
  return array;
}

// Displays error messages depending on status code
function errorMessages(statusCode) {
  let message;
  switch(statusCode) {
    case 400:
      message = "Error 400: This ticket is not valid!";
      return message;
    case 401:
      message = "Error 401: Sorry, could not authenticate you!";
      return message;
    case 404:
      message = "Error 404, This ticket does not exist!";
      return message;
    default:
      message = "Unknown error: Contact website admin!"
      return message;
  }
}

/* ------------- End Helper Functions ---------------- */

module.exports = {
  getAllTickets,
  getSpecificTickets,
};