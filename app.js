  const express = require('express')
  const app = express();
  const path = require('path')
  // const Mail = require('./modules/mailform')

  app.use( express.json() );       // to support JSON-encoded bodies
  app.use(express.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 



  const nodemailer = require('nodemailer')
  const port = process.env.PORT || 3004;

  const static_path= path.join(__dirname, '../mail-nodejs')

  app.use(express.static(static_path))




app.get('/', (req, res)=>{
  res.render('index')
})
app.get('/sendmail', (req, res)=>{
  res.send('sendmail')
})
  app.post('/sendmail', (req, res)=>{

    var data ={
      name:req.body.name,
      email:req.body.email,
      subject:req.body.subject,
      message:req.body.message

    }
    const transporter = nodemailer.createTransport({
          
      service: 'gmail',
      auth:{
        user:'ruhinaz09@gmail.com',
        pass: 'ruhishaf9'
      }
    });
    var message = {
      from: 'ruhinaz09@gmail.com',
      to: 'shafeeq.obriens@gmail.com',
      subject: `${data.subject}`,
      text: `${data.name} ${data.message}`,
      // html: ``
    };
    try{
      transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
  
      res.status(201).send('Email sent')
    }
    catch (error) {
      res.status(400).send(error)
  }
  })
    app.listen(port, ()=>{
      console.log(`app is running on ${port}`)
  })
