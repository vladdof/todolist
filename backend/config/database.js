import 'dotenv/config'
import { Sequelize } from 'sequelize';

const sqliteStoragePath = process.env.SQLITE_STORAGE_PATH || './database.sqlite'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: sqliteStoragePath
})

// const sequelizeForPostgres = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// });
