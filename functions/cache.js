const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300, checkperiod: 1 });

const saveCache = (pages_arr) => {
    cache.set(`pages`, pages_arr);
}

const getCache = () => {
    return cache;
}

module.exports = {saveCache, getCache};
