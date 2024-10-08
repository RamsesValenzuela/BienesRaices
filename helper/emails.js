import nodemailer from 'nodemailer';

const regiterEmail = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const {email, user, token} = datos

      await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirme your email en BienesRaises.com',
        text: 'Confirme your email en BienesRaises.com',
        html: `
        <p> hola ${user}, comprueba tu cuenta </p>
        <p>Tu cuenta ya esta lista, solo debes de confirmaela en el siguiente enlace</p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/confirmar/${token}">Confirme su cuenta</a>


        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `

      })
}

const passwordReset = async (datos) =>{
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const {email, user, token} = datos

    await transport.sendMail({
      from: 'BienesRaices.com',
      to: email,
      subject: 'Reestablesca su contraseña en BienesRaices.com',
      text: 'Reestablesca su contraseña en BienesRaices.com',
      html: `
      <p> Hola ${user}, Haz solicitado reestablecer tu password en BienesRaices.com </p>
      <p>Sigue el siguiente enlace para generar un nuevo password </p>
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/olvide-password/${token}">Reestablecer Password</a> 


      <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
      `

    })
}

export {
    regiterEmail,
    passwordReset
}