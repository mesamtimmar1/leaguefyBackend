const leagueJs = require('../../lib/leagueJs');

process.env.LEAGUE_API_PLATFORM_ID = 'na';
const leaguePlatformId = process.env.LEAGUE_API_PLATFORM_ID;
const numOfMatchesRequired = 10;

const getLeagueStatsBySummonerName = (req, res) => {
    const summonerName = req.params.summonerName;
    leagueJs.Summoner
        .gettingByName(summonerName)
        .then(summonerData => {
            const matchListOptions = {
                endIndex: numOfMatchesRequired 
            };
            leagueJs.Match
            .gettingListByAccount(summonerData.accountId, leaguePlatformId, options=matchListOptions)
            .then(matchesData => {
                res.json(matchesData);
            });
        })
        .catch(err => res.send(404));
}

module.exports.getLeagueStatsBySummonerName = getLeagueStatsBySummonerName;