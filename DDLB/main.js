const { getLeaderboard } = require('./leaderboardAPI')
const wrapperFunc = async () => {
    let start = 1
    let entriesAmount = await getLeaderboard(start)
    console.log(entriesAmount)
    while(entriesAmount != 0) {
        start += 100
        entriesAmount = await getLeaderboard(start)
    }
}

wrapperFunc()