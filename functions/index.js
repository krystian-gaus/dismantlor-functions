const functions = require('firebase-functions').region('europe-west3'); // Frankfurt
const admin = require('firebase-admin');
const repository = require('./repository');
const stringValidator = require('./string_validator');
admin.initializeApp();

////////////
// DREAMS //
////////////

exports.addDream = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new Error('Only authenticated users are allowed to add dreams');
    }

    if (stringValidator.isInvalidString(data['title'])) {
        console.log('Dream title is invalid');
        return {
            "success": false,
            "message": 'Dream title is invalid'
        };
    }

    const exists = await repository.dreamTitleExists(admin, data['title']);

    if (exists) {
        console.log('Dream title ' + data['title'] + ' already exists');
        return {
            "success": false,
            "message": 'Dream title ' + data['title'] + ' already exists'
        };
    }

    await repository.addDream(admin, data['title']);

    console.log('Dream has been successfully added');

    return {
        "success": true,
        "message": "Dream has been successfully added"
    };
});

exports.updateDream = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new Error('Only authenticated users are allowed to update dreams');
    }

    if (stringValidator.isInvalidString(data['dream_id'])) {
        console.log('Dream ID is invalid');
        return {
            "success": false,
            "message": 'Dream ID is invalid'
        };
    }

    const exists = await repository.dreamExists(admin, data['dream_id']);

    if (!exists) {
        console.log("Dream ID '" + data['dream_id'] + "' does not exist");
        return {
            "success": false,
            "message": 'Dream ID does not exist'
        };
    }

    if (stringValidator.isInvalidString(data['title'])) {
        console.log('Dream title is invalid');
        return {
            "success": false,
            "message": 'Dream title is invalid'
        };
    }

    const titleExists = await repository.dreamTitleExists(admin, data['title']);

    if (titleExists) {
        console.log('Dream title ' + data['title'] + ' already exists');
        return {
            "success": false,
            "message": 'Dream title ' + data['title'] + ' already exists'
        };
    }

    await repository.updateDream(admin, data['dream_id'], data['title']);

    console.log('Dream has been successfully updated');

    return {
        "success": true,
        "message": "Dream has been successfully updated"
    };
});

exports.deleteDream = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new Error('Only authenticated users are allowed to delete dreams');
    }

    if (stringValidator.isInvalidString(data['dream_id'])) {
        console.log('Dream ID is invalid');
        return {
            "success": false,
            "message": 'Dream ID is invalid'
        };
    }

    const exists = await repository.dreamExists(admin, data['dream_id']);

    if (!exists) {
        console.log("Dream ID '" + data['dream_id'] + "' does not exist");
        return {
            "success": false,
            "message": 'Dream ID does not exist'
        };
    }

    const hurdlesExist = await repository.hurdlesExist(admin, data['dream_id']);

    if (hurdlesExist) {
        console.log("Dream '" + data['dream_id'] + "' is not empty");
        return {
            "success": false,
            "message": 'Dreams with hurdles cannot be deleted'
        };
    }

    await repository.deleteDream(admin, data['dream_id']);

    console.log('Dream has been successfully deleted');

    return {
        "success": true,
        "message": "Dream has been successfully deleted"
    };
});