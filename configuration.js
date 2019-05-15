const key_json = require('./key.json');

exports.configuration = () => {
    return {
        aplication_port: 5000,
        url_firebase: "https://temsearcher.firebaseio.com",
        key: key_json
    }
}