const Profile = {
    data: {
        name: "Henrique",
        "avatar": "https://avatars.githubusercontent.com/u/6643122?v=4",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "hourly-rate": 75
    },

    controllers: {
        index(request, response) {
            return response.render("profile", { profile: Profile.data })
        },

        update(request, response) {
            const data = request.body
            const weeksPerYear = 52
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] ) / 12
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            const monthTotalHours = weekTotalHours * weeksPerMonth
            data["hourly-rate"] = data["monthly-budget"] / monthTotalHours
            Profile.data = data
            return response.redirect("/profile")
        }
    }
}

module.exports = Profile;