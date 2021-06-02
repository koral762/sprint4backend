const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('board')
            // const boards = await collection.find(criteria).toArray()
        var boards = await collection.find().toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }

}

async function remove(boardId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('board')
            // remove only if user is owner/admin
        const query = { _id: ObjectId(boardId) }
        if (!isAdmin) query.byUserId = ObjectId(userId)
        await collection.deleteOne(query)
            // return await collection.deleteOne({ _id: ObjectId(boardId), byUserId: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}


async function add(board) {
    try {
        // peek only updatable fields!
        const boardToAdd = {
            byUserId: ObjectId(board.byUserId),
            aboutUserId: ObjectId(board.aboutUserId),
            txt: board.txt
        }
        const collection = await dbService.getCollection('board')
        await collection.insertOne(boardToAdd)
        return boardToAdd;
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    remove,
    add
}