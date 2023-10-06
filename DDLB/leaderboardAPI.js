// create a leaderboard output that prints the rank, id, time, and death type of each entry in the returned JSON
// https://devildaggers.info/swagger/index.html#/Leaderboards/Leaderboards_GetLeaderboard

// NEED TO: research logging for implementation as an AWS lambda

const axios = require('axios')
const http = require('http')

console.log('running')

// first implementation, too slow due to awaits

const getLeaderboard = async(start) => {
    let res = await axios({
        mehod: 'get',
        url: `https://devildaggers.info/api/leaderboards?rankStart=${start}`,
    })
    .then(response => {
        entries = response.data.entries

        for (let i = 0; i < entries.length; i++) {
            entry = entries[i]
            console.log(`Rank: ${entry.rank}`),
            console.log(`id: ${entry.id}`),
            console.log(`Time: ${entry.time}`) 
            console.log(`Death Type: ${entry.deathType}`) 
            console.log('\n')
        }
        return entries.length
    })
    return res
}

module.exports = {
    getLeaderboard
}