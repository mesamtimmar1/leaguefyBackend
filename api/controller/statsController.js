const getLeagueStatsBySummonerName = (req, res) => {
    console.log('Request processed');
    const result = {
        result: 'Request processed from controller'
    }
    res.json(result);
}

module.exports.getLeagueStatsBySummonerName = getLeagueStatsBySummonerName;