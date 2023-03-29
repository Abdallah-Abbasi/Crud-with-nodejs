const fs = require('fs')
const yargs = require('yargs')
const uniqid = require('uniqid')
const validator= require('validator')
const chalk= require('chalk')

//create user function and how it works
const createUser = (name, email) => {
    const users = loadUsers()
    const id = uniqid()
    const duplicateUser = users.find((user) => user.id === id)
    if (!duplicateUser) {
        if (validator.isEmail(email)){
        users.push({
            id: id,
            name: name,
            email: email
        })
        saveUsers(users)
        console.log(chalk.green.inverse('New user Added'))
    } else {console.log(chalk.red.inverse('Invalid Email'))}
} else {
        console.log(chalk.red.inverse('user id taken! try to run the command again and the uniqid will give u new id'))
    }
}

const DeleteUser = (id) => {
    const users = loadUsers()
    const usersToKeep = users.filter((user) => user.id !== id)

    if (users.length > usersToKeep.length){
        console.log(chalk.green.inverse('User removed!'))
        saveUsers(usersToKeep)
    } else {
        console.log(chalk.red.inverse('No ID found!'))
    }
}

const ReadUser = (id) =>{
    const users = loadUsers()
    const user = users.find((user) => user.id === id)
    if (user) {
        console.log(chalk.inverse(user.id))
        console.log(user.name)
        console.log(user.email)
    } else {
        console.log(chalk.red.inverse('Id Not Found!!!!'))
    }
}

const updateUser = (id, name, email) => {
    const users = loadUsers()
    const user = users.find(user => user.id === id)
    if (!user) {
        console.log(chalk.red.inverse('User not found!'))
    }
    if (!name && !email) {
        console.log(chalk.red.inverse('Please provide either name or email to update!'))
    }
    if (email && !validator.isEmail(email)) {
        console.log(chalk.red.inverse('Invalid email format!'))
    }
    user.name = name || user.name
    user.email = email || user.email
    saveUsers(users)
    console.log(chalk.green.inverse('User updated successfully!'))
}



const saveUsers = (users) => {
    const dataJSON = JSON.stringify(users)
    fs.writeFileSync('users.json', dataJSON)
}

const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync('users.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
module.exports = {
    createUser: createUser,
    DeleteUser: DeleteUser,
    ReadUser: ReadUser,
    updateUser: updateUser
}