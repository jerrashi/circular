import { pool } from './database.js'
import './dotenv.js'
import itemData from '../data/items.js'

const createItemsTable = async() => {
    const createTableQuery = `
    DROP TABLE IF EXISTS items;

    CREATE TABLE IF NOT EXISTS items  (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        compPrice FLOAT NOT NULL,
        condition VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        audience VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        compURL VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        listedBy VARCHAR(255) NOT NULL,
        listedOn TIMESTAMP NOT NULL
    )
    `
    try{
        const res = await pool.query(createTableQuery)
        console.log('🎉 items table created successfully')
    }
    catch(err){
        console.error('⚠️ error creating items table', err)
    }
}

const seedItemsTable = async() => {
    await createItemsTable()
    itemData.forEach((item) => {
        const insertQuery = {
            text: 'INSERT INTO items (name, price, compPrice, condition, category, audience, image, compURL, description, listedBy, listedOn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
        }
        const values = [
            item.name,
            item.price,
            item.compPrice,
            item.condition,
            item.category,
            item.audience,
            item.image,
            item.compURL,
            item.description,
            item.listedBy,
            item.listedOn
        ]
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting item', err)
                return
            }
        
            console.log(`✅ ${item.name} added successfully`)
        })
    })
}

seedItemsTable()