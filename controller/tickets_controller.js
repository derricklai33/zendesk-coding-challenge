const axios = require('axios');
const { response } = require('express');

function getAllTickets(req, res) {
  let url = `https://derricklai-zendesk-challenge.zendesk.com/api/v2/tickets.json`
  try{
    axios.get(url, {
      auth: {
        username: 'derrick.laijy@gmail.com',
        password: 'q1w2e3r4t5',
      }
    })
      .then(response => response.data)
      .then(data => {
        let dataObj = {
          chunk1: data.tickets.slice(0, 25),
          chunk2: data.tickets.slice(26, 50),
          chunk3: data.tickets.slice(51, 75),
          chunk4: data.tickets.slice(76, 100)
        }
        return dataObj;
      })
      .then(obj => res.send(obj));
  } catch(error) {
    console.error(error);
  }
}

function getSpecificTickets(req, res) {
  let url = `https://derricklai-zendesk-challenge.zendesk.com/api/v2/tickets/${req.params.ticket_id}.json`
  try{
    axios.get(url, {
      auth: {
        username: 'derrick.laijy@gmail.com',
        password: 'q1w2e3r4t5',
      }
    })
      .then(response => response.data)
      .then(data => res.send(data))
      .catch(error => res.send(error))
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  getAllTickets,
  getSpecificTickets
} 