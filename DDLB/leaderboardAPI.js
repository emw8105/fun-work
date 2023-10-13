// create a leaderboard output that prints the rank, id, time, and death type of each entry in the returned JSON
// https://devildaggers.info/swagger/index.html#/Leaderboards/Leaderboards_GetLeaderboard

// NEED TO: research logging for implementation as an AWS lambda, optimize to not use await calls for every API response
// first implementation, too slow due to awaits

const axios = require('axios')
console.log('running')

const getLeaderboard = async(start) => {
    let res = await axios.get(`https://devildaggers.info/api/leaderboards?rankStart=${start}`)
    .then(response => {
        return response.data.entries
    })
    return res
}
const getTotalPlayers = async(start) => {
    return await axios.get(`https://devildaggers.info/api/leaderboards?rankStart=1`)
    .then(response => {
        return response.data.totalPlayers
    })
}

const wrapperFunc = async () => {
    let start = 1, entries, totalPlayers = await getTotalPlayers()
    console.log(totalPlayers)
    while(start <= totalPlayers) {
        entries = getLeaderboard(start)
        for (let i = 0; i < entries.length; i++) {
            entry = entries[i]
            console.log(`Rank: ${entry.rank}\nid: ${entry.id}\nTime: ${entry.time}\nDeath Type: ${entry.deathType}\n\n`)
        }
        start += 100
    }
}
wrapperFunc()

//axios.all
//iife
//get total players from stats call rather than awaiting each call to check if entities length = 0
