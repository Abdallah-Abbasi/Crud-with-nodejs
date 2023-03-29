const fs = require('fs')
const yargs = require('yargs')
const uniqid = require('uniqid')
const validator= require('validator')
const users = require('./Operations.js')

//customize yargs version 
yargs.version('1.1.0')

//create a user Command
yargs.command({
    command: 'create',
    describe: 'Create A new User',
    builder: {
        name: {
            describe: 'The name of the user',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'The Email of the user',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        users.createUser(argv.name, argv.email)
    }
})

//create a read command
yargs.command({
    command: 'read',
    describe: 'read the user based on the id',
    builder: {
        id: {
            describe: 'The id of the user',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        users.ReadUser(argv.id)
    }
})
//create the Update command
yargs.command({
    command: 'update',
    describe: 'update the user based on the id',
    builder: {
        id : {
            describe: 'The id of the user',
            demandOption: true,
            type: 'string'
        },
        name: {
            describe: 'The name of the user',
            demandOption: false,
            type: 'string'
        },
        email: {
            describe: 'The Email of the user',
            demandOption: false,
            type: 'string'
        },
    },
    handler(argv) {
        users.updateUser(argv.id, argv.name, argv.email)
    }
})
//create a Delete command
yargs.command({
    command: 'delete',
    describe: 'delete the user based on the id',
    builder: {
        id: {
            describe: 'The id of the user',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        users.DeleteUser(argv.id)
    }
})


yargs.parse()
//Hi