const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
    create(request, response) {
        return response.render("job")
    },

    async edit(request, response) {
        const profile = await Profile.get()
        const jobId = request.params.id
        const jobs = await Job.get()
        const job = jobs.find(job => Number(job.id) === Number(jobId))
        if(!job){
            return response.send("Job not found")
        }
        job.cost = JobUtils.calculateCost(job, profile["hourly-rate"])
        return response.render("job-edit", { job })
    },

    async save(request, response) {
        let job = request.body
        let jobs = await Job.get()
        job["created-at"] = Date.now()
        let lastJobId = jobs[jobs.length - 1]?.id || 0
        job.id = lastJobId + 1
        await Job.create(job)
        return response.redirect("/")
    },

    async update(request, response){
        const jobId = request.params.id
        const updatedJob = {
            name: request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"],
        }
        await Job.update(updatedJob, jobId)
        return response.redirect("/")
    },

    delete(request, response){
        const jobId = request.params.id
        Job.delete(jobId)
        return response.redirect("/")
    }
}