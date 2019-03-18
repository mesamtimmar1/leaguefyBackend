const leagueJs = require('../../lib/leagueJs');

const leaguePlatformId = process.env.LEAGUE_API_PLATFORM_ID;
const numOfMatchesRequired = 3;

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
                    let extractedMatchesListData = [];
                    matchesDetail.forEach(matchDetail => {
                        extractedMatchesListData.push(extractMatchData(matchDetail, summonerData.accountId));
                    });
                    console.log('promise resolved');
                    res.json(extractedMatchesListData);
                })
                .catch(err => res.json([]));
            });
        })
        .catch(err => res.json([]));
}

extractMatchData = (matchDetail, summonerAccountId) => {
    let parsedMatchData = {
        outcome: null,
        gameDuration: null,
        summonerSpells: null,
        summonerPerks: null,
        championName: null,
        kills: null,
        deaths: null,
        assists: null,
        itemsBought: null,
        championLevel: null,
        totalCreepScore: 0,
        creepScorePerMinute: null
    }

    //game duration
    parsedMatchData.gameDuration = matchDetail.gameDuration;
    
    //finding the participant id
    const participantIdentity = matchDetail.participantIdentities.find(participantIdentity => 
                            participantIdentity.player.accountId == summonerAccountId
                        );
    const participantId = participantIdentity.participantId;

    if (!participantId) {
        return;
    }
    //extracting stats for that partcipant
    const participant = matchDetail.participants.find(participant =>
                        participant.participantId == participantId
                    );
    if (!participant) {
        return;
    }
    parsedMatchData.summonerSpells = getMatchingKeysValue('spell', participant);
    parsedMatchData.championName = participant.championId;

    const stats = participant.stats;
    if (stats.win)
        parsedMatchData.outcome = 'Won';
    else
        parsedMatchData.outcome = 'Lost';

    parsedMatchData.kills = stats.kills;
    parsedMatchData.deaths = stats.deaths;
    parsedMatchData.assists = stats.assists;
    parsedMatchData.totalCreepScore += stats.totalMinionsKilled;
    parsedMatchData.totalCreepScore += stats.neutralMinionsKilled;
    parsedMatchData.totalCreepScore += stats.neutralMinionsKilledEnemyJungle;
    parsedMatchData.totalCreepScore += stats.neutralMinionsKilledTeamJungle;
    parsedMatchData.championLevel = stats.champLevel;
    parsedMatchData.itemsBought = getMatchingKeysValue('item', stats);
    parsedMatchData.summonerPerks = getMatchingKeysValue('perk', stats);
    parsedMatchData.creepScorePerMinute = parsedMatchData.totalCreepScore / matchDetail.gameDuration;
    return (parsedMatchData);
  }

getMatchingKeysValue = (keySubstring, obj) => {
    let matchedValues = [];
    Object.keys(obj).forEach( key => {
        if (key.includes(keySubstring)) {
            matchedValues.push(obj[key]);
        }
    });
    return matchedValues;
}

module.exports.getLeagueStatsBySummonerName = getLeagueStatsBySummonerName;