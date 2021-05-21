const algolia = require('../utils/db')
const Books = algolia.initIndex('Books')
const { v4: uuidv4 } = require('uuid');
const textCaseHandler = require("../utils/textCaseHandler")
const sanitizeHtml = require('sanitize-html')

class bookService{
    addBook = async (options) => {
        try{
            let {title, description, status} = options
            title = sanitizeHtml(title)
            description = sanitizeHtml(description)
            status = sanitizeHtml(status)

            options = {
                objectID: uuidv4(),
                title: textCaseHandler.firstLetterInSetenceToCapital(title),
                description, status
            }

            let data = await Books.saveObject(options)
            return {"data": {"success": true, "message": 'Book saved', data}, "statusCode": 201}
        }
        catch(err){
            return {"data": {"success": false, "message": err.message}, "statusCode": 500}
        }
    }

    getOneBook = async (params) => {
        try{
            let {id} = params
            if (!id)
            {
                return {"data": {"success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": "id"}, "statusCode": 417}
            }

            let data = await Books.getObject([id], {
                attributesToRetrieve: ['title', 'description', 'objectID', 'status']
            })

            return {"data": {"success": true, "message": 'Book ready', data}, "statusCode": 200}
        }
        catch(err){
            return {"data": {"success": false, "message": err.message}, "statusCode": 500}
        }
    }

    updateOneBook = async (params, options) => {
        try{
            let {id} = params
            let {title, description, status} = options
            if (!id)
            {
                return {"data": {"success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": "id"}, "statusCode": 417}
            }
            
            let data = await Books.getObject([id], {
                attributesToRetrieve: ['title', 'description', 'objectID', 'status']
            })

            let oldTitle = data.title
            let oldDescription = data.description
            let oldStatus = data.status

            let newTitle = !title ? oldTitle : title
            let newDescription = !description ? oldDescription : description
            let newStatus = !status ? oldStatus : status

            let newData = await Books.partialUpdateObject({
                title: newTitle,
                description: newDescription,
                status: newStatus,
                objectID: id
            })

            return {"data": {"success": true, "message": 'Book updated', "data": newData}, "statusCode": 200}
        }
        catch(err){
            return {"data": {"success": false, "message": err.message}, "statusCode": 500}
        }
    }

    deleteOneBook = async (params) => {
        try{
            let {id} = params
            if (!id)
            {
                return {"data": {"success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": "id"}, "statusCode": 417}
            }
            
            let data = await Books.deleteObjects([id])
            return {"data": {"success": true, "message": 'Book deleted', data}, "statusCode": 200}
        }
        catch(err){
            return {"data": {"success": false, "message": err.message}, "statusCode": 500}
        }
    }
}

module.exports = bookService