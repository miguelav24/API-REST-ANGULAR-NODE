module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.DB_URL || 'mongodb://localhost:27017/shop'
}