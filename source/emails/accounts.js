const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'balajibalajanci@gmail.com',
        subject:'Thanks for joining in my application',
        text:`welcome to our applicaiton, ${name}`
    })
}

const sendCancelationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'balajibalajanci@gmail.com',
        subject:`Goodebye we will miss you ${name}`,
        text:`Anything we need to improve please provide anything, ${name}`
    })
}

module.exports={
    sendWelcomeEmail,sendCancelationEmail
}