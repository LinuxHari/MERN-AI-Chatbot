import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { COOKIE_NAME } from './constants.js'

export const createToken = async (id: string, email:string, expiresIn:string) => {
    const payload = {id, email}
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(payload, secret, {expiresIn})
    return token   
}

export const verifyToken = async(req:Request, res:Response, next:NextFunction) => {
    const token = req.signedCookies[`${COOKIE_NAME}`]
    console.log(req.signedCookies,"cookie")
    if(!token || token.trim() === "")
        return res.status(401).json({message:"Token Not Recieved"})
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if(err){
                reject(err.message)
                return res.status(401).json({message: "Token Expired"})
            } else {
                console.log("Token Verification Successful")
                resolve()
                res.locals.jwtData = success
                return next()
            }
        })
    })
}