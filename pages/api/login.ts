import type { NextApiRequest, NextApiResponse } from 'next'
var cookie = require('cookie');
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionData = req.body
  let myCookie;
  if (sessionData.id === "webskitters" && sessionData.password === "webskitters")
    {
        let cookieString = `${sessionData.id} ${sessionData.password}`
        myCookie = cookie.serialize('session',cookieString, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60, // One week
            path: '/',
          })
          
    } 
    else{
        myCookie = cookie.serialize('session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
          })
    } 

    res.setHeader('Set-Cookie', myCookie)
    res.status(200).json({ message: 'Successfully set cookie!' })
  
}