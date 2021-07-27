const Profile = require("../model/Profile")

module.exports = {
    async index(request, response) {
        return response.render("profile", { profile: await Profile.get() })
    },

    async update(request, response) {
        const data = request.body
        const weeksPerYear = 52
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] ) / 12
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        const monthTotalHours = weekTotalHours * weeksPerMonth
        let hourlyRate = data["monthly-budget"] / monthTotalHours
        const profile = await Profile.get()
        await Profile.update({
            ...profile,
            ...request.body,
            "hourly-rate": hourlyRate
        })
        return response.redirect("/profile")
    }
}