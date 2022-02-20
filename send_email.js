var nodemailer = require('nodemailer');
 
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
  

 
module.exports = {


    sendEmail: function(fileName,email,formname)
    {
       
        var mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'pdf.fillform@gmail.com',
              pass: 'Form1234'
            }
          });
           
          var mailOptions = {
             from: 'pdf.fillform@gmail.com',
             to: email,
             subject: formname+' Form has been filled',
             text: 'Your form Change of Name(s) has been filled successfully. Please find the pdf attached',
             attachments: [{
                 filename: fileName,
                 path: './filledPdf/'+fileName
             }]
          }
        mail.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
      });
    }
}