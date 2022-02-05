/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllPosts } = require("../lib");

exports.getPosts = function(request, response) {
    const postsData = [];
    let status = 200;
    let result;

    const getPostsPromise = getAllPosts().then((postData) => {
        console.log("postData:",postData);
        postData.forEach((postDoc) => {
            postsData.push(postDoc.data());
        });
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promises = [getPostsPromise];
    Promise.all(promises).then(() => {
            result = { data: { status: "OK", data: postsData } };
            console.log("Got Posts Sucessfully");
            console.log(result)
            return response.status(status).send(result);
        })
        .catch((error) => {
            console.error("Error Getting Posts", error);
            result = { data: { status: "Error", data: undefined } };
            return response.status(status).send(result);
        });
};