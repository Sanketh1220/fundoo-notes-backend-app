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
     * @param {*} res depends on the request of user
     * @param {*} if there is no data function calls for next function
     */
    checkCache = (req, res, next) => {
        console.log("req param", req.params);
        const  getNotes  = req.params;
        console.log("req param", getNotes.notes);
        console.log('User:${req.user._id}', getNotes);
        client.get(getNotes.notes, (error, data) => {
            console.log('Hey am here inside the client.get');
            console.log(`data ${data}`);
            if(error) console.log('I am error', error);
            // let parsedData = JSON.parse(data);
            // if(data !== null && parsedData.length !== 0)
            if(data !== null) {
                data = JSON.parse(data);
                console.log(`data ${data}`);
                res.send({success: true, message: "Notes Retrieved!", data: data});
            }else {
                console.log('Going to nxt');
                next();
            }
        });
    }

    /**
     * @description setting data to key into redis
     * @param userId
     * @param data
     */
    setDataInCache = () => {
        client.set(notes, JSON.stringify(data));
    }
}

module.exports = new RedisClass();