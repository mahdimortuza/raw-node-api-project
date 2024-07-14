const data = require('../../lib/data')
const {hash} = require('../../helpers/utilities')


const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];

    if (acceptedMethod.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof requestProperties.body.tosAgreement === 'boolean'&& requestProperties.body.tosAgreement.trim().length > 0 ? requestProperties.body.tosAgreement : false;

    if(firstName && lastName && phone && password && tosAgreement){
        // make sure the user dose not exists
        data.read('users', phone, (err1) => {
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone, 
                    password: hash(password),
                    tosAgreement
                }
                data.create('users', phone, userObject, (err2) => {
                    if(!err2){
                        callback(200, {
                            "message": "user created successfully."
                        })
                    }else{
                        callback(500, {'error': "could not create user"})
                    } 
                })
            }else{
                callback(500, {
                    error: "internal server error!"
                })
            }
        })
    }else {
        callback(400, {
            error: "something went wrong!"
        })
    }
};

handler._users.get = (requestProperties, callback) => {
    // check the phone number is valid
};

handler._users.put = (requestProperties, callback) => {};

handler._users.delete = (requestProperties, callback) => {};
module.exports = handler;
