const leagueJs = require('../../lib/leagueJs');

process.env.LEAGUE_API_PLATFORM_ID = 'na';
const leaguePlatformId = process.env.LEAGUE_API_PLATFORM_ID;
const numOfMatchesRequired = 5;

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
                let promiseList = [];
                matchesData.matches.forEach(match => {
                    promiseList.push(leagueJs.Match.gettingById(match.gameId, leaguePlatformId));
                })
                Promise.all(promiseList)
                .then(matchesDetail => {
                    res.json(matchesDetail);
                })
                .catch(err => res.json({error: 'Erorr with some match data'}));
            });
        })
        .catch(err => res.send(404));
}

module.exports.getLeagueStatsBySummonerName = getLeagueStatsBySummonerName;