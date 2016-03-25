#!/usr/bin/env node

var db = process.argv[2],
    execSync = require('child_process').execSync,
    BB = require('bluebird'),
    mongodb = BB.promisifyAll(require('mongodb')),
    MongoClient = mongodb.MongoClient;

console.log(`Using DB: ${ db }`);

console.log('assuming use of localhost mongo - will check for users collection and ghAdmin collection');

MongoClient.connectAsync(`mongodb://127.0.0.1/${ db }`)
    .bind({
        db : null
    })
    .then(function(database) {
        this.db = database;
        return this.db.collection('users').find().toArrayAsync();
    })
    .then(function(results) {
        var users = results.length;
        console.log(`${ users } users.`);
        if (!users) {
            console.log('Adding initial user. u:admin p:TestPassword');
            return this.db.collection('users').insertOne(ghUser());
        }
    })
    .then(function() {
        return this.db.collection('config').find().toArrayAsync();
    })
    .then(function(results) {
        var configs = results.length;
        console.log(`${ configs } users.`);
        if (!configs) {
            console.log('Adding some intial configs');
        }
    })
    .then(function() {
        execSync(`nodemon test ${ db }`);
    })
    .catch(function(e) {
        console.log('error', e);
    });

function ghUser() {
    return  {
        role: 'admin',
        enabled: true,
        firstname: 'Test',
        lastname: 'User',
        identities: {
            basic: {
                username: 'admin',
                salt: '225384010328',
                hash: '885f59a76ea44e1d264f9da45ca83574fbe55e3e7e6c51afe681730b45c7bb03'
            }
        },
        displayName : 'admin',
        linkedIdentities : ['basic'],
        email: 'email@email.com'
    }
}