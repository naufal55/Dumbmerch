const {category} = require('../../models')

exports.addCategory = async(req,res) => {

    try {
        const data = await category.create(req.body)//create = insert into
        const {id, name} = data;
        res.status(201).send({
            status: 'success',
            data:{
                category:{id, name},
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getCategories = async (req, res) => {
    try {

        const data = await category.findAll({ // select *
            attributes: {
                exclude: ['createdAt', 'updatedAt'] // pengecualian 3 item tdk dtampilkan
            }
        })

        res.status(201).send({
            status: 'success',
            categories: data
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params

        const data = await category.findAll({ // select ... where ...
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'] // pengecualian 3 item tdk dtampilkan
            }
        })

        res.status(201).send({
            status: 'success',
            data: {
                category :data
            }
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params

        await category.update(req.body, { //update set values where
            where: {
                id
            }
        })
        const data = await category.findAll({ // select ... where ...
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'] // pengecualian 3 item tdk dtampilkan
            }
        })
        res.status(201).send({
            status: 'success',
            data: {
                category :data
            }
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteCategory = async (req, res) => {
    // code here
    try {
        const { id } = req.params

        await category.destroy({ // delete where id
            where: {id}
        })

        res.status(201).send({
            status: 'success',
            data : {
                id : id
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}