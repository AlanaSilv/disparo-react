const mailer = require('nodemailer');
module.exports = (email, nome, message, annex) => {
    const smtpTransport= mailer.createTransport({
      host: 'SMTP.office365.com',
      port: 587,
      secure: false,
      auth:{
        user: 'lana__lima@hotmail.com',
        pass: ''
      }
    })

    const mail = {
        from: 'lana__lima@hotmail.com',
        to: email,
        subject: `Email enviado por ${nome}`,
        text: message,
    }

    if(annex){
      console.log(annex); 
      mail.attachments = [];
      mail.attachments.push({
        filename: annex.originalname,
        content:annex.buffer
      })

    }

    return new Promise((resolve, reject) => {
      smtpTransport.sendMail(mail)
          .then(response =>{
              smtpTransport.close();
              return resolve(response);
          })
          .catch(error =>{
            smtpTransport.close();
            return reject(error);
          });

    })

}