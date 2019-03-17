const stats = require('../controller/statsController');

module.exports =  (app) => {
    app.route('/api/lol/summoner/stats/:summonerName')
        .get(stats.getLeagueStatsBySummonerName);
}