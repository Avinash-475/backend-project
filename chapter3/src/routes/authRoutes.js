import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'
import { cache } from 'react'


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
   }catch(err){
    console.log(err.message)
    res.sendStatus(503)
              }

res.sendStatus(201)
}            )


router.post('/login',(req,res) => {

}           )

export default router