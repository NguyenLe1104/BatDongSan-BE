const containsSpecialChars = (text) => {
    const specialCharRegex = /[!@#$%^&(){}|<>]/;
    return specialCharRegex.test(text);
};

exports.validateFieldsNoSpecialChars = (fields) => {
    for (const field of fields) {
        if (field && containsSpecialChars(field)) {
            return true;
        }
    }
    return false;
};