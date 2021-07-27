const Profile = require('../model/Profile')

module.exports = {
    remainingDays(job){
        let totalDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        let createdDate = new Date(job["created-at"])
        let dueDay = createdDate.getDate() + Number(totalDays)
        let dueDate = createdDate.setDate(dueDay)
        let deltaTimeinMS = dueDate - Date.now()
        let remainingDays = Number(Math.floor(deltaTimeinMS / 86400000))
        return remainingDays > 0 ? remainingDays : 0
    },

    calculateCost(job, hourlyRate){
        return Number(hourlyRate) * Number(job['total-hours'])
    }
}