const leagueJS = require('leaguejs');

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