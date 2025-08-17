module.exports = async function (context, req) {
  const name = req.query.name || (req.body && req.body.name);

  if (name) {
    context.res = {
      status: 200,
      body: `Welcome from Jithin!!`  
    };
  } else {
    context.res = {
      status: 400,
      body: "Could you please include a name to the query string?"  
    };
  }
};
