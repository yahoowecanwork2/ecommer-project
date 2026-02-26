import { createTransport } from 'nodemailer';


//send verify successfully and send user id on email  for admin user and for student user both
export const sendVerifyUser = async (email,subject) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const html = `<body style="font-family: Arial, sans-serif; line-height: 1.4; margin: 10px; padding: 14px; background-color: #f4f4f4; text-align: left; display: flex; justify-content: center; align-items: center; height: fit-content;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 15px; border-radius: 6px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);">        
        <h1 style="color: green; font-size: 20px; margin-bottom: 10px;">Email verification complete </h1>
        // <h3 style="color: #333; font-size: 16px; margin-bottom: 5px;">User id ${id}</h3>
       </div>
</body>
`;
  await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject,
    html,
  });

}


export const sendLoginMailtoUser = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });


  const html = `<body style="font-family: Arial, sans-serif; line-height: 1.4; margin: 10px; padding: 14px; background-color: #f4f4f4; text-align: left; display: flex; justify-content: center; align-items: center; height: fit-content;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 15px; border-radius: 6px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);">        
        <h1 style="color: red; font-size: 20px; margin-bottom: 10px;">Login email </h1>
        <h3 style="color: #333; font-size: 16px; margin-bottom: 5px;">Dear ${data?.name}</h3>
        <h3 style="color: #333; font-size: 16px; margin-bottom: 5px;">Dear ${data?.message}</h3>
       </div>
</body>
`;

  await transport.sendMail({
    from: process.env.GMAIL,
    to: data.email,
    subject,
    html,
  });

}




export const sendMailtoUser = async (email, subject, name, message) => {
  // console.log(email,subject,name,message)
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const html = `<h3>Hello ${name} </h3>
                <p> ${message} </p>`;

  await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject,
    html,
  });
};




export const sendMailtoAdmin = async (subject, name, message) => {
  // console.log(email,subject,name,message)
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const html = `<h3>Hello ${name} </h3>
                <p> ${message} </p>`;

  await transport.sendMail({
    from: process.env.GMAIL,
    to: "sanjeevyaadav28520@gmail.com",
    subject,
    html,
  });
};














































// send to user paid amount location and type and show that we will contatct you soon 
export const orderEmailtoUser = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const html = `<body style="font-family: Arial, sans-serif; line-height: 1.3; margin: 10px; padding: 14px; background-color: #f4f4f4; text-align: left; display: flex; justify-content: center; align-items: center; height: fit-content;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 15px; border-radius: 6px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);">     
        <h1 style="font-size: 20px; margin-bottom: 10px;">Inquery Email</h1>
        <h3 style="color: #333; font-size: 15px; margin-bottom: 5px;">Inquery Type : ${data.category} Phone No. : ${data.phoneno},</h3>
        <p style="color: #555; font-size: 15px; margin-bottom: 5px;">
            Individual email : ${data.email}  
            Items Quantity : ${data?.itemsQty ? data.itemsQty : "Inquery contain only single item"}
        </p>
        <p>Please check admin dashboard</p>
        <h4 style="color: #333; font-size: 16px; margin-bottom: 8px;">Lee Home Packers and Movers</h4>
        <p style="margin-bottom: 5px;">
            <a href="https://www.leehomepackers.com/" style="color: #333; text-decoration: none; font-size: 16px;">
                www.leehomepackers.com
            </a>
        </p>
        <p style="color: #333; font-size: 16px; font-weight: bold; margin-bottom: 3px;">📞 9310553121</p>
    </div>
</body>`;

  await transport.sendMail({
    from: process.env.GMAIL,
    to:data.email,
    subject,
    html,
  });
};


// quotation email 
// send email to leehomepackers account 
export const orderEmail = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const html = `<body style="font-family: Arial, sans-serif; line-height: 1.3; margin: 10px; padding: 14px; background-color: #f4f4f4; text-align: left; display: flex; justify-content: center; align-items: center; height: fit-content;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 15px; border-radius: 6px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);">     
        <h1 style="font-size: 20px; margin-bottom: 10px;">Inquery Email</h1>
        <h3 style="color: #333; font-size: 15px; margin-bottom: 5px;">Inquery Type : ${data.category} Phone No. : ${data.phoneno},</h3>
        <p style="color: #555; font-size: 15px; margin-bottom: 5px;">
            Individual email : ${data.email}  
            Items Quantity : ${data?.itemsQty ? data.itemsQty : "Inquery contain only single item"}
        </p>
        <p>Please check admin dashboard</p>
        <h4 style="color: #333; font-size: 16px; margin-bottom: 8px;">Lee Home Packers and Movers</h4>
        <p style="margin-bottom: 5px;">
            <a href="https://www.leehomepackers.com/" style="color: #333; text-decoration: none; font-size: 16px;">
                www.leehomepackers.com
            </a>
        </p>
        <p style="color: #333; font-size: 16px; font-weight: bold; margin-bottom: 3px;">📞 9310553121</p>
    </div>
</body>`;

  await transport.sendMail({
    from: process.env.GMAIL,
    to: "leehomepackers@gmail.com",
    subject,
    html,
  });
};







