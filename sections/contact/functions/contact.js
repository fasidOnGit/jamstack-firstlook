exports.handler = (event, _context, callback) => {
  console.log({event});

  const data = JSON.parse(event.body);

  const email = {
    from: 'Kader Fasid <fasidmpm@gmail.com>',
    to: `${data.name} <${data.email}>`,
    subject: data.subject,
    text: data.body
  };
  console.log('Sending email...')

  setTimeout(() => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({boop: true})
    });
  }, 1000);
};
