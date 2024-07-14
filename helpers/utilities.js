const crypto = require('crypto')
const environments = require('./environments')

// parse json string to object
const utilities = {};
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    }

    return output;
}; 


// hashing the password
 
utilities.hash = (str) => {
    if(typeof(str) === 'string' && str.length > 0){
        let hash = crypto.createHmac('aes-128-cbc', environments.secretKey)
        .update(str)
        .digest('hex')
        return hash
    }else{
        return false 
    }
};

module.exports = utilities;
