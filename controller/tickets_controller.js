const axios = require("axios");

async function getAllTickets(_req, res) {
  let tickets = [];
  let url = `https://derricklai-zendesk-challenge.zendesk.com/api/v2/tickets.json`;
  try {
    do {
      const responseData = await axios
        .get(url, {
          auth: {
            username: process.env.LOGIN,
            password: process.env.PASSWORD,
          },
        })
        .catch((error) => {
          res.send(error);
          url = null;
        });
      tickets = [...tickets, ...responseData.data.tickets];
      url = responseData.data.next_page;
    } while (url !== null);
    res.send(tickets);
  } catch (error) {
    console.error(error);
  }
}

function getSpecificTickets(req, res) {
  let url = `https://derricklai-zendesk-challenge.zendesk.com/api/v2/tickets/${req.params.ticket_id}.json`;
  try {
    axios
      .get(url, {
        auth: {
          username: process.env.LOGIN,
          password: process.env.PASSWORD,
        },
      })
      .then((response) => response.data)
      .then((data) => res.send(data))
      .catch((error) => res.send(error));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllTickets,
  getSpecificTickets,
};
