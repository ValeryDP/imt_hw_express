const {Router} = require('express')
const nodemailer = require('nodemailer')  //- add nodemailer
const Todo = require('../models/Todo')
const router = Router()
let msg = {}

let transporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'corsair835@gmail.com', 
        pass: ''
    } 
  }); 

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        isHome: true
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        isAbout: true
    })
})

router.get('/contacts', (req, res) => {
    res.render('contacts', {
        title: 'Contacts',
        isContacts: true
    })
})

router.post('/contacts', (req, res) => {
    msg.first_name = req.body.first_name
    msg.last_name = req.body.last_name
    msg.phone = req.body.phone
    msg.email = req.body.email

    let transporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: 'corsair8353@gmail.com', 
            pass: '******'
        } 
        }) 
        
        let mailDetails = { 
            from: 'corsair8353@gmail.com', 
            to: 'corsair8353@gmail.com', 
            subject: 'Nodemailer', 
            text: JSON.stringify(msg)
        }
        
        transporter.sendMail(mailDetails, function(err, info) { 
            if(err) { 
                console.log('Otakoyi'); 
            } else { 
                console.log('Success'); 
            } 
        })
        res.redirect('/contacts');
    })

    router.get('/todo', async (req,res) => {
        const todos = await Todo.find({}).lean()
        res.render('index', {
            title: 'Todo list',
            isIndex: true,
            todos
        })
    })

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})
router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })
    await todo.save()
    res.redirect('/todo')
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/todo')
})

module.exports = router