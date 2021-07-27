const Profile = require('./profile')

const Job = {
    data: [
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
    ],

    controllers: {
        index(request, response) {
            let updatedJobs = Job.data.map((job) => {
                let remainingDays = Job.services.remainingDays(job)
                let status = remainingDays <= 0 ? "done" : "progress"
                return {
                    ...job,
                    "remaining-days": remainingDays,
                    status: status,
                    cost: Job.services.calculateCost(job)
                }
            })
            return response.render("index", { "jobs": updatedJobs })
        },

        create(request, response) {
            return response.render("job")
        },

        edit(request, response) {
            const jobId = request.params.id
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
            if(!job){
                return response.send("Job not found")
            }
            job.cost = Job.services.calculateCost(job)
            return response.render("job-edit", { job })
        },

        save(request, response) {
            // response.sendStatus(200)
            // console.log(request.body)
            let job = request.body
            job["created-at"] = Date.now()
            let lastJobId = Job.data[Job.data.length - 1]?.id || 0
            job.id = lastJobId + 1
            // console.log(job)
            Job.data.push(job)
            return response.redirect("/")
        },

        update(request, response){
            const jobId = request.params.id
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
            if(!job){
                return response.send("Job not found")
            }
            const updatedJob = {
                ...job,
                name: request.body.name,
                "total-hours": request.body["total-hours"],
                "daily-hours": request.body["daily-hours"],
            }
            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)){
                    job = updatedJob
                }
                return job
            })
            // return response.redirect(`/job/${job.id}`)
            return response.redirect("/")
        },

        delete(request, response){
            const jobId = request.params.id
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
            return response.redirect("/")
        }
    },

    services: {
        remainingDays(job){
            let totalDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            let createdDate = new Date(job["created-at"])
            let dueDay = createdDate.getDate() + Number(totalDays)
            let dueDate = createdDate.setDate(dueDay)
            let deltaTimeinMS = dueDate - Date.now()
            let remainingDays = Number(Math.floor(deltaTimeinMS / 86400000))
            return remainingDays > 0 ? remainingDays : 0
        },

        calculateCost(job){
            return Number(Profile.data["hourly-rate"]) * Number(job['total-hours'])
        }
    }
}

module.exports = Job;