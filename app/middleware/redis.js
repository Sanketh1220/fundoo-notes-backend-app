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
        const getAllNotes = notes;
        console.log(getAllNotes);
        client.get(getAllNotes, (error, data) => {
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