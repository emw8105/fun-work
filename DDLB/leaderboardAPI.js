// create a leaderboard output that prints the rank, id, time, and death type of each entry in the returned JSON
// https://devildaggers.info/swagger/index.html#/Leaderboards/Leaderboards_GetLeaderboard

// NEED TO: research logging for implementation as an AWS lambda, optimize to not use await calls for every API response

const axios = require('axios')
console.log('running')

const getTotalPlayers = async() => { // gets the current total player count to iterate until to print the whole leaderboard
    return await axios.get(`https://devildaggers.info/api/leaderboards?rankStart=1`).then(response => { return response.data.totalPlayers})}

(async () => {
    let start = 1, urls = [], end = 10000, playerCount = await getTotalPlayers()
    console.log(`Total players: ${playerCount}`)
    while(end <= playerCount) { // server doesnt like thousands of simultaneous requests, have to send chunks of requests
        while(start < end) {urls.push(`https://devildaggers.info/api/leaderboards?rankStart=${start}`), start+=100} // push next 100 URL requests onto array representing next 10000 players
        const requests = urls.map((url) => axios.get(url)); // map url requests to axios.get so requests can be made simultaneously with axios.all
        let res = await axios.all(requests)
        res.forEach(response => { // loop through JSON response and print entry information to populate the leaderboard
            response.data.entries.forEach(entry => {
            console.log(`Rank: ${entry.rank}\nid: ${entry.id}\nTime: ${entry.time}\nDeath Type: ${entry.deathType}\n\n`)
            })
        })
        end += 10000, urls = [] // update to get next 10000 players
    }
})()