import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import { token } from 'morgan';
const bcrypt = require('bcrypt');

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user Registration
export const newUserRegistration = async (body) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(body.password, saltRounds);
  body.password = hash;
  const data = await User.create(body);
  return data;
};

//login user
export const loginUser=async(body)=>{
  const data = await User.findOne({email:body.email});
  if(data !== null){
    const result=await bcrypt.compare(body.password,data.password);
    if(result){
      var token=jwt.sign({email:data.email,id:data._id},
        'Secreate-key')
      return token
    }
    else
    {
      throw new  Error('invalid password');

    }
  }else
  {
    throw new  Error('imvalid email');
  }
};