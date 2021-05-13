const axios = require("axios");
const { response } = require("express");

async function getAllTickets(_req, res) {
  let data = {tickets: [], error: ""};
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
      data.tickets = [...data.tickets, ...responseData.data.tickets];
      url = responseData.data.next_page;
    } while (url !== null);
  } catch (error) {
    console.log(error.message);
    data.error = errorMessages(error.response.status);
  } finally {
    res.send(data);
  }
}

async function getSpecificTickets(req, res) {
  let data = {ticket: {}, error: ""};
  let url = `https://derricklai-zendesk-challenge.zendesk.com/api/v2/tickets/${req.params.ticket_id}.json`;
  try {
    const responseData = await axios
      .get(url, {
        auth: {
          username: process.env.LOGIN,
          password: process.env.PASSWORD,
        },
      })
    data.ticket = responseData.data.ticket;
  } catch (error) {
    console.log(error.message)
    data.error = errorMessages(error.response.status);
  } finally {
    res.send(data);
  }
}

function errorMessages(statusCode) {
  let message;
  switch(statusCode) {
    case 400:
      message = "Error 400, id is not valid";
      return message;
    case 401:
      message = "Error 401, could not authenticate you";
      return message;
    case 404:
      message = "Error 404, id does not exist";
      return message;
    default:
      message = "Unknown error, contact website admin"
      return message;
  }
}

module.exports = {
  getAllTickets,
  getSpecificTickets,
};