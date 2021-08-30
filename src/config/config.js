
/* 

List of different errors in the application

*/
const errors = {

    invalidSortBy           :'sortBy parameter is invalid',
    invalidSortDirection    :'direction parameter is invalid',
    missingTags             :'tags parameter is required',
    fetchError              :'error fetching data from the server, please try again later'

}

/* 

List of different values for sort parameter

*/
const sortValues = [
    'id',
    'reads',
    'likes',
    'popularity'
]

/* 

List of different values for direction parameter

*/
const directionValues = [
    'asc',
    'desc'
]



module.exports = {
    errors,
    sortValues,
    directionValues
}