// const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const boardService = require('./board.service')

async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.query)
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}
async function getBoard(req, res) {
    try {
        const board = await boardService.getById(req.params.id)
        res.send(board)
    } catch (err) {
        logger.error('Cannot get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}

async function addBoard(req, res) {
    try {
        console.log('in controller');
        var board = req.body
        // board.byUserId = req.session.user._id
        board = await boardService.add(board)

        res.send(board)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}


async function updateBoard(req, res) {
    try {
        const board = req.body
        // console.log('updateBoard', board)
        const savedBoard = await boardService.update(board)
        res.send(savedBoard)
        // socketService.broadcast({ type: 'board-updated', data: board, to: savedBoard._id })
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}

module.exports = {
    getBoards,
    deleteBoard,
    addBoard,
    updateBoard,
    getBoard
}