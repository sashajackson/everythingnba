const moment = require('moment');
const day = moment().date();
const month = moment().month();
const year = moment().year();
const date = year + month + day;

const endPoints = {
    stats: 'https://api.mysportsfeeds.com/v2.1/pull/nba/2020-2021-regular/team_stats_totals.json',
    standings: 'https://api.mysportsfeeds.com/v2.1/pull/nba/2020-2021-regular/standings.json',
    games: `https://api.mysportsfeeds.com/v2.1/pull/nba/2020-2021-regular/date/20210213/games.json`,
}

module.exports = endPoints;