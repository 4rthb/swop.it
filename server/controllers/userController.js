const path = require('path')
var fs = require('fs');

function registerUser(username, email, password)
{
  users_data = fs.readFileSync('./models/users.json');
  users = JSON.parse(users_data);
  console.log(users);
  var alreadyTaken = false;

  Object.entries(users).forEach((entry) => {
    const [key, value] = entry;

    if(email === key){
      console.log(email);
      console.log(key);
      alreadyTaken = true
    }
  });

  if(alreadyTaken) return false;
  else
  {
    users[email] = { username, password }
    var data = JSON.stringify(users, null, 2);
    fs.writeFile('./models/users.json', data, finished);
    function finished(err) {
        if(err) console.log("Error reading json files")
    };

    return true;
  }
}

function validateUser(email, password)
{
    users_data = fs.readFileSync('./models/users.json');
    users = JSON.parse(users_data);
  
    var ret = 2;
    Object.entries(users).forEach((entry) => {
      const [key, value] = entry;
        
      if(email === key){
        if(value['password'] === password) 
        { 
            ret = 0; 
        }
        else 
        { 
            ret = 1; 
        }
      }
    });
    return ret;
}

module.exports = { registerUser, validateUser }