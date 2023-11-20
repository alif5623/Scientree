// Do not expose your Neon credentials to the browser
// .env
const {Client} = require("pg");

const db = new Client({
    user: 'alif5623',
    host: 'ep-delicate-poetry-36455463.ap-southeast-1.aws.neon.tech',
    database: 'scientreeDB',
    password: 'sw70fgFQXcrL',
    port: 5432,
    sslmode: 'require',
    ssl: true
});

const connectDB = async () => {
    try{
        await db.connect();
        console.log("Database berhasil terkoneksi")
    }catch(err){
        console.error("Database gagal terkoneksi " + err.message)
    }
};

module.exports = {connectDB, db};