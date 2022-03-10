import * as secrets from '../secrets/secrets';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
    // apiKey: process.env.CLARIFAI_API_KEY
    apiKey: secrets.CLARIFAI_API_KEY
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