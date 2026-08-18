import mongoose from 'mongoose'
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);


let connectionDB = async () => {
    try {
        let connectionInstence = await mongoose.connect(`${process.env.MONGODB_URI}`)

        console.log(`\n MongoDB is connected Successfully | DB_host = ${connectionInstence.connection.host} | DB_port = ${connectionInstence.connection.port} | DB_name = ${connectionInstence.connection.name}\n`)

    } catch (error) {
        console.error('MongoDB connection error -', error)
        process.exit(1);
    }
}

export default connectionDB ;
