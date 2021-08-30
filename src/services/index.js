const axios     = require("axios");
const constants = require("../constants/constants");
const config    = require("../config/config")
const cache     = require('memory-cache');


/*
    - Ping the server to check the status.

*/

const ping = (req, resp) => {
    return resp.status(200).json({ success: true });
};


/*
    - Get the posts data with specified parameters

*/
const getPostsData = async (req, resp) => {

    let requestData     = req.query;
    let tags = requestData.tags || null;
    let sortBy = requestData.sortBy || 'id';
    let sortDirection = requestData.direction || 'asc';
    let requestPromises = [];
    let resultData = []


    if (!tags) {
        return resp.status(400).json({ error: config.errors.missingTags });
    }

    if (!config.sortValues.includes(sortBy)) {
        return resp.status(400).json({ error: config.errors.invalidSortBy });
    }

    if (!config.directionValues.includes(sortDirection)) {
        return resp.status(400).json({ error: config.errors.invalidSortDirection });
    }


    tags = tags.split(",");

    for (let tag of tags) {

        if (tag.trim()) requestPromises.push(fetchBlogData(tag));

    }

    resultData = await Promise.all(requestPromises).catch(function(err) {
       
        return null;
    });

    if(resultData){

        resultData = filterAndCombine(resultData);
        resultData = sortData(resultData, sortBy, sortDirection);

        return resp.send({ posts: resultData });

    }

    return resp.send({error : config.errors.fetchError});

    
};


/*
    Sort array of objects for a specified sortBy property value and sortDirection
*/

const sortData = (arrayData, sortBy, sortDirection) => {

    arrayData.sort((a, b) => {

        if (sortDirection === "asc") {

            return a[sortBy] - b[sortBy];

        } else {

            return b[sortBy] - a[sortBy];

        }

    });

    return arrayData;

};


/*
    - Combine and remove duplicates by looping through an multidimensional array containing posts data for each tag value.

*/

const filterAndCombine = (arrayData) => {

    const dataMap = new Map();

    arrayData.forEach((dataSection, sectionId) => {


        dataSection.forEach((data, dataId) => {

            if (!dataMap.has(data.id)) {

                dataMap.set(data.id, data);

            }

        });

    });

    return Array.from(dataMap.values());

};


/*  
    - fetch the blog post data from an external API for a specific tag.
    - if data is cached it will be retrieved from the cache.

*/

const fetchBlogData = async (tag) => {

    let cacheData = cache.get(tag);
    if (cacheData) return cacheData;

    return axios
        .get(constants.API_URL + "/assessment/blog/posts", {
            params: {
                tag: tag,
            },
        })
        .then((response) => {

            cache.put(tag, response.data.posts);
            return response.data.posts;

        })
        .catch((error) => {
            
            throw error;

        });
};

module.exports = {
    ping,
    getPostsData
};
