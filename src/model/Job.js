const Database = require('../db/config')

/* let data = [
    {
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 60,
        "created-at": Date.now(),
        id: 1
    },
    {
        name: "One Two Project",
        "daily-hours": 3,
        "total-hours": 47,
        "created-at": Date.now(),
        id: 2
    }
] */

module.exports = {
    async get(){
        const db = await Database()
        const jobs = await db.all(`SELECT * FROM jobs`)
        db.close()
        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            "created-at": job.created_at
        }))
    },

    async update(newData, jobId){
        const db = await Database()
        await db.run(`UPDATE jobs SET
            name = "${newData.name}",
            daily_hours = ${newData["daily-hours"]},
            total_hours = ${newData["total-hours"]}
        WHERE id = ${jobId} 
        `)
        db.close()  
    },

    async delete(id){
        const db = await Database()
        await db.run(`DELETE FROM jobs WHERE id = ${id}`)
        db.close()  
    },

    async create(newJob){
        const db = await Database()
        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob["created-at"]}
        )`)
        db.close()
    }
}