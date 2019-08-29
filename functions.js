module.exports.inArray = function (needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] === needle) return true;
    }
    return false;
};

module.exports.mergeObj = function (obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key) === true) obj[key] = src[key];
    }
    return obj;
};

module.exports.getFileExtension = function (filename) {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext === null ? '' : ext[1];
};

module.exports.res = function (status, result, error = {}) {
    let res = {
        status: status,
        result: result
    };
    if (error !== null && error.hasOwnProperty('name') === true) {
        res = this.mergeObj(res, {
            error: {
                name: error.name,
                message: error.message || error.errmsg
            }
        });
    }
    return res;
};

module.exports.newdata = function (data, skip = []) {
    let newData = {};
    for (var key in data) {
        if (this.inArray(key, skip) === false) {
            newData[key] = data[key];
        }
    }
    return newData;
};

module.exports.like = function (data, fields = []) {
    let regexps = {};
    for (var f = 0; f < fields.length; f++) {
        let key = fields[f];
        if (data.hasOwnProperty(key) === true) {
            // regexps[key] = new RegExp(data[key], 'i');
            regexps[key] = data[key];
        }
    }
    return regexps;
};

module.exports.randCode = function (length) {
    return 'ADVDEFG';
}

module.exports.strongPWD = function (password) {
    let strength = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (strength.test(password) === true) {
        return true;
    } else {
        return false;
    }
}

module.exports.calcAge = function (dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
}


module.exports.people = function (doc) {
    return {
        _id: doc._id,
        first_name: doc.first_name,
        last_name: doc.last_name,
        full_name: doc.first_name + ' ' + doc.last_name,
        email: doc.email,
        phone_no: doc.phone_no,
        gender: doc.gender,
        date_of_birth: doc.date_of_birth,
        age: this.calcAge(doc.date_of_birth),
        profile_pic: doc.profile_pic,
        country: doc.country,
        address: doc.address,
        occupation: doc.occupation,
        hobbies: doc.hobbies,
        comments: doc.comments
    };
}