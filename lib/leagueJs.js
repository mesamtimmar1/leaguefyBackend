const leagueJS = require('leaguejs');

process.env.LEAGUE_API_KEY = 'RGAPI-170c856f-5a2d-4329-aba7-42839d70d239';
module.exports = new leagueJS(process.env.LEAGUE_API_KEY, {
    useV4: true, // enables apiVersion overrides
    apiVersionOverrides: {
        'Champion': 'v4',
        'ChampionMastery': 'v4',
        'League': 'v4',
        'LolStatus': 'v4',
        'Match': 'v4',
        'Spectator': 'v4',
        'Summoner': 'v4',
        'ThirdPartyCode': 'v4',
    }
})