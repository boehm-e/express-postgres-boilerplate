let redis = null;

const init = cb => {
    const _redis = require("redis");

    redis = _redis.createClient();
    redis.on("error", err => {
	throw new Error((`Error ${err}`));
    });

    cb();
};


export default redis;
export {init};
