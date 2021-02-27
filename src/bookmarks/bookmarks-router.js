const express = require('express')
const { v4: uuid } = require('uuid');
const logger = require('../logger')
const { bookmarks } = require('../store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        res
            .json(bookmarks)
    })
    .post(bodyParser, (req, res) => {
        //Look for data in the request body
        const { title, url, rating, desc } = req.body;
        //Validate the title and content exist
        if (!title) {
            logger.error(`Title is required`);
            return res
                .status(400)
                .send('Invalid data');
        }

        if (!url) {
            logger.error(`Content is required`);
            return res
                .status(400)
                .send('Invalid data');
        }

        if (!rating) {
            logger.error(`Content is required`);
            return res
                .status(400)
                .send('Invalid data');
        }

        if (!desc) {
            logger.error(`Content is required`);
            return res
                .status(400)
                .send('Invalid data');
        }

        //Generate ID and push bookmark to array
        const id = uuid();

        const bookmark = {
            id,
            title,
            url,
            rating,
            desc
        };

        bookmarks.push(bookmark);
        logger.info(`bookmark with id ${id} created`);

        res
            .status(201)
            .location(`http://localhost:8000/bookmark/${id}`)
            .json(bookmark);
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id } = req.params;
        const bookmark = bookmarks.find(b => b.id == id);

        // make sure we found a bookmark
        if (!bookmark) {
            logger.error(`bookmarks with id ${id} not found.`);
            return res
                .status(404)
                .send('bookmark Not Found');
        }

        res.json(bookmark);
    })
    .delete((req, res) => {
        const { id } = req.params;

        const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

        if (bookmarkIndex === -1) {
            logger.error(`bookmark with id ${id} not found.`);
            return res
                .status(404)
                .send('Not found');
        }

        //remove bookmark from lists
        //assume bookmarkIds are not duplicated in the bookmarkIds array
        // lists.forEach(list => {
        //     const bookmarkIds = list.bookmarkIds.filter(cid => cid !== id);
        //     list.bookmarkIds = bookmarkIds;
        // });

        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`bookmark with id ${id} deleted.`);

        res
            .status(204)
            .end();
    })

    module.exports = bookmarksRouter