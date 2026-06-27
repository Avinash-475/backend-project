import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'



const router = express.Router()

       router.post('/register',(req,res) => {
       const {username,password} = req.body

       const hasedpassword = bcrypt.hashSync(password,8)
       console.log(hasedpassword)

try{
      const insertUser = db.prepare(`INSERT INTO users(username,password) VALUES (?,?)`)
      const result = insertUser.run(username,hasedpassword)

       const defaultTodo = `Hello add your first todo!`
       const insertTodo = db.prepare(`INSERT INTO todos(user_id,task) VALUES (?,?)`)
       insertTodo.run(result.lastInsertRowid,defaultTodo)
      
       const token = jwt.sign({id:result.lastInsertRowid}, process.env.JWT_SECRET , {expiresIn : '24h'})
}catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
    console.error("MESSAGE:", err.message);

    return res.status(503).json({
        error: err.message
    });
}
              
res.sendStatus(201)
}            )


router.post('/login',(req,res) => {

}           )

export default router