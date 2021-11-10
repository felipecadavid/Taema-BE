const User = require('./user.model');

async function createUser(req, res){
    const user = new User({ ...req.body, isAdmin: false });
    try{
        const result = await user.save();
        res.status(201).json({
            message: 'User created successfully',
            result
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    createUser
};