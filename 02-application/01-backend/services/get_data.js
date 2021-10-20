const request = require('request');

module.exports = (address, sendResponse) => {
    request({ url: address, json:true }, sendResponse);
};