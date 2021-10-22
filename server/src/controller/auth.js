import User from '../models/auth.js';
import jwt from 'jsonwebtoken';

export const signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'user already registered'
        });

        const {
            firstName,
            email,
            password
        } = req.body;
        const _user = new User({ 
            firstName,       
            email, 
            password,
            username: Math.random().toString(),
            role: 'user',
            default: 'user'
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }

            if(data){
                return res.status(201).json({
                    message: 'user created Succesfuly'
                })
            }
        });



    });
}

export const signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){

            if(user.authenticate(req.body.password) && user.role === 'user'){
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: {_id, firstName, lastName, email, role, fullName}
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid creds'
                })
            }

        }else{
            return res.status(400).json({message: 'Something went wrong'});
        }
    });
}

