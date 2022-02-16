const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a5338064528c415892cf4b4d8610d5ce'
  });

const handleApiCall = (req, res) => {
    const {image} = req.body;
    app.models.predict(Clarifai.FACE_DETECT_MODEL, image)
    .then(response => res.json(response))
    .catch(err => res.status(400).json('Unable to retrieve from API'))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('Unable to retrieve entries'))

}

module.exports = {
    handleImage,
    handleApiCall
}