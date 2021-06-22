/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : To send data to user using redis DB
 *
 * @description
 *
 * @file        : middleware/redis.js
 * @overview    : helps to provide data to user
 * @module      : this is necessary to access the data in the database.
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : - - -
 * @since       : 22-06-2021
 *********************************************************************/

const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);

class RedisClass {
    /**
     * @description function written to provide data to user in minimal time using caching
     * @param {*} a req valid request is expected
     * @param {*} res depends in the request of user
     * @param {*} if there is no data function shifts to next function
     */
    checkCache = (req, res, next) => {
        const notesId = req.params;
        console.log('Notes Id at Redis', notesId);
        client.get(notesId, (error, data) => {
            if(error) return(error);
            if(data != null) {
                res.send({success: true, message: "Notes Retrieved!", data: data});
            }else {
                next();
            }
        })
    }
}
module.exports = new RedisClass();