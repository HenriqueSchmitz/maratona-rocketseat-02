const sqlite3 = require('sqlite3')
const Database = require('./config')

const initDb = {
    async init() {
        const db = await Database()

        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            hours_per_day INT,
            days_per_week INT,
            vacation_per_year INT,
            hourly_rate INT
        )`)

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        await db.run(`
        INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            hours_per_day,
            days_per_week,
            vacation_per_year,
            hourly_rate
        ) VALUES (
            "Henrique",
            "https://scontent.fcxj7-1.fna.fbcdn.net/v/t1.6435-9/186547946_3992232090858930_6151477893697102642_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=vAdtsNEnZXEAX81LI7l&_nc_ht=scontent.fcxj7-1.fna&oh=54017a90dd33074d1719714f532905e1&oe=6124F884",
            3000,
            5,
            5,
            4,
            75
        );`)

        await db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1627422298017
        );`)

        await db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "One Two Project",
            3,
            47,
            1627422298017
        );`)

        await db.close()
    }
}

initDb.init()