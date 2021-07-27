const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profile")

module.exports = {
    async index(request, response) {
        let profile = await Profile.get()
        let job = await Job.get()
        let freeHours = profile["hours-per-day"]
        let statusCount = {
            progress: 0,
            done: 0,
            total: job.length
        }
        let updatedJobs = job.map((job) => {
            let remainingDays = JobUtils.remainingDays(job)
            let status = remainingDays <= 0 ? "done" : "progress"
            statusCount[status] += 1
            if(status == "progress"){
                freeHours -= Number(job["daily-hours"])
            }
            return {
                ...job,
                "remaining-days": remainingDays,
                status: status,
                cost: JobUtils.calculateCost(job, profile["hourly-rate"])
            }
        })
        return response.render("index", {
            jobs: updatedJobs,
            profile: profile,
            statusCount: statusCount,
            freeHours: freeHours,
        })
    },
}