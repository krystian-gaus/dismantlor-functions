const dreams = 'dreams';
const hurdles = 'hurdles';
const findings = 'findings';
module.exports = {
    ////////////
    // DREAMS //
    ////////////
    dreamExists: async function(admin, dreamId) {
        return await admin.firestore().collection(dreams).doc(dreamId).get().then(doc => {
            console.log('Dream \'' + dreamId + '\' exists: ' + doc.exists);
            return doc.exists;
        });
    },
    dreamTitleExists: async function(admin, title) {
        return await admin.firestore().collection(dreams).where('title', '==', title).get().then(snapshot => {
            console.log('Dream title \'' + title + '\' exists: ' + !snapshot.empty);
            return !snapshot.empty;
        });
    },
    getDream: async function(admin, dreamId) {
        return await admin.firestore().collection(dreams).doc(dreamId).get().then(doc => doc.data());
    },
    addDream: async function(admin, title) {
        const timestamp = admin.firestore.FieldValue.serverTimestamp();
        return await admin.firestore().collection(dreams).add({
            title: title,
            created: timestamp,
            updated: timestamp,
        }).then(doc => {
            console.log('Dream has been successfully added');
            return doc.get();
        });
    },
    updateDream: async function(admin, dreamId, title) {
        return await admin.firestore().collection(dreams).doc(dreamId).update({
            title: title,
            updated: admin.firestore.FieldValue.serverTimestamp(),
        }).then(() => console.log('Updated dream \'' + dreamId + '\''));
    },
    deleteDream: async function(admin, dreamId) {
        return await admin.firestore().collection(dreams).doc(dreamId).delete()
            .then(() => console.log('Deleting dream \'' + dreamId + '\'...'));
    },
    /////////////
    // HURDLES //
    /////////////
    hurdlesExist: async function(admin, dreamId) {
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).get().then(snapshot => {
            console.log('Hurdles exist in dreamId \'' + dreamId + '\': ' + !snapshot.empty);
            return !snapshot.empty;
        });
    },
    hurdleExists: async function(admin, dreamId, hurdleId) {
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).doc(hurdleId).get().then(doc => {
            console.log('Hurdle \'' + hurdleId + '\' exists: ' + doc.exists);
            return doc.exists;
        });
    },
    getHurdle: async function(admin, dreamId, hurdleId) {
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).doc(hurdleId).get().then(doc => doc.data());
    },
    addHurdle: async function(admin, dreamId, title) {
        const timestamp = admin.firestore.FieldValue.serverTimestamp();
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).add({
            title: title,
            created: timestamp,
            updated: timestamp,
        }).then(doc => {
            console.log('Hurdle has been successfully added');
            return doc.get();
        });
    },
    updateHurdle: async function(admin, dreamId, hurdleId, title) {
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).doc(hurdleId).update({
            title: title,
            updated: admin.firestore.FieldValue.serverTimestamp(),
        }).then(() => console.log('Updated hurdle \'' + hurdleId + '\''));
    },
    deleteHurdle: async function(admin, dreamId, hurdleId) {
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).doc(hurdleId).delete()
            .then(() => console.log('Deleting hurdle \'' + hurdleId + '\'...'));
    },
    /////////////
    // FINDINGS //
    /////////////
    findingExists: async function(admin, dreamId, hurdleId, findingId) {
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).doc(hurdleId).collection(findings).doc(findingId).get().then(doc => {
            console.log('Finding \'' + findingId + '\' exists: ' + doc.exists);
            return doc.exists;
        });
    },
    getFinding: async function(admin, dreamId, hurdleId, findingId) {
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).doc(hurdleId).collection(findings).doc(findingId).get().then(doc => doc.data());
    },
    addFinding: async function(admin, dreamId, hurdleId, question, answer, ranking) {
        const timestamp = admin.firestore.FieldValue.serverTimestamp();
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).doc(hurdleId).collection(findings).add({
            question: question,
            answer: answer,
            ranking: ranking,
            created: timestamp,
            updated: timestamp,
        }).then(doc => {
            console.log('Finding has been successfully added');
            return doc.get();
        });
    },
    updateFinding: async function(admin, dreamId, hurdleId, findingId, answer) {
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).doc(hurdleId).collection(findings).doc(findingId).update({
            answer: answer,
            updated: admin.firestore.FieldValue.serverTimestamp(),
        }).then(() => console.log('Updated finding \'' + findingId + '\''));
    },
    deleteFinding: async function(admin, dreamId, hurdleId, findingId) {
        return await admin.firestore().collection(dreams).doc(dreamId).collection(hurdles).doc(hurdleId).collection(findings).doc(findingId).delete()
            .then(() => console.log('Deleting finding \'' + findingId + '\'...'));
    }
};