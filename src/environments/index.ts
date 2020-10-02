import dotenv from 'dotenv';

dotenv.config()

// application
const DOMAIN: string = process.env.DOMAIN || 'localhost'
const PORT: number = +process.env.PORT! || 3000

// MySQL
const MYSQL_USER = process.env.MONGO_USER || 'user'
const MYSQL_PASS = process.env.MONGO_PASS || 'password'
const MYSQL_DATABASE = process.env.MONGO_DATABASE || 'chaveiro'

// jwt secrets
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '1ln23hufnlkdsafojdsf'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'qp9jd12e120u932n3'

export {
    DOMAIN,
    PORT,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DATABASE,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
}