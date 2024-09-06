import {userModel} from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const home = (req,res) => {
    res.send('Home Page')
}

const register = async (req,res) => {
   try{
    const {nombre,email,password,telefono,region,ciudad,direccion} = req.body
    const result = await userModel.addUser({nombre,email,password,telefono,region,ciudad,direccion})
    res.send('Usuario creado con éxito')
    console.log(result)
   } catch(error) {
    res.status(500).send(error.message)
   }
}

const login = async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await userModel.getUser({email,password})
        if(!user){
            res.status(401).send('Usuario no existe')
        }else{
            const token = jwt.sign({email,password},process.env.JWT_SECRET)
            res
                .status(200)
                .cookie('token', token)
                .send('User logged in')
        }
    }catch(error){
        console.log('Error', error.message)
    }
}

const verifyToken = (req, res) => {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).send('Acceso denegado')
    } else {
      console.log("Token válido", token)
    }
    try{
      const data = jwt.verify(token,process.env.JWT_SECRET)
      console.log("Data", data)
    } catch (error) {
      res.send('Error verificando el token')
    }
  }

const notFound = (req,res) => {
    res.send('404 - Page not found')
}

export const userController = {
    home,
    register,
    login,
    verifyToken,
    notFound
}
