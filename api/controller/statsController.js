const leagueJs = require('../../lib/leagueJs');

process.env.LEAGUE_API_PLATFORM_ID = 'na';
const leaguePlatformId = process.env.LEAGUE_API_PLATFORM_ID;


const getLeagueStatsBySummonerName = (req, res) => {
    const summonerName = req.params.summonerName;
    leagueJs.Summoner
        .gettingByName(summonerName )
        .then(summonerData => res.json(summonerData))
        .catch(err => res.send(404));
}

module.exports.getLeagueStatsBySummonerName = getLeagueStatsBySummonerName;