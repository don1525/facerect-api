const { restart } = require("nodemon");

const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('Incomplete signon submission');
    }
        db('login').select('*')
            .where('email', '=', email)
            .returning('hash')
            .then(hash => {
                const isValid = (bcrypt.compareSync(password, hash[0].hash));
                if(isValid) {
                    return db('users').select('*').where('email', '=', email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('Unable to retrieve user'))
                }
                else {res.status(400).json('Invalid credentials')}
            })
            .catch(err => res.status(400).json('Auth error'))
}

module.exports = {
    handleSignIn: handleSignIn
}