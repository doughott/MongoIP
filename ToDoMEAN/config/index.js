var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        return 'mongodb://' + configValues.uname +
        ':' + configValues.pwd + '@dbh85.mlab.com:27857/dicetodo';
    }
    
}