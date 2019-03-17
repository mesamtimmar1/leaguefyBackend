module.exports =  (app) => {
    app.route('/api/lol/summoner/stats')
    .get((req, res) => {
        console.log('Request processed');
        const result = {
            result: 'Request processed'
        }
        res.json(result);
    });
}