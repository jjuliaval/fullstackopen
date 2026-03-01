const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.lfm1lul.mongodb.net/phoneBookApp?appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('People', personSchema)

// if there are only 3 arguments, we want to show the phonebook
if (process.argv.length == 3) {
    const phonebook = []

    Person.find({}).then(result => {
    result.forEach(person => {
        phonebook.push(person)
    })
    
    console.log('phonebook:')
    phonebook.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    }) 
  mongoose.connection.close()
})
}
else if (process.argv.length === 5) {  // if there are 5 arguments, we want to add a new person to the phonebook
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
}
else { // if there are 4 arguments or more than 5 arguments, we want to show an error message
  console.log('invalid number of arguments')
  process.exit(1)
  mongoose.connection.close()
}