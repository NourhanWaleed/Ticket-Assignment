const app = require('./app')
const mongoose = require('mongoose')
const port = 3000
console.log(port)
mongoose.set('strictQuery', false)
//note: I know this is not the cleanest code I can write but it kept timingout and I found this solution on stackoverflow
async function start() {
    try {
      //Database Connect
      await mongoose.connect(
        'mongodb://127.0.0.1:27017/tickets',
        {
        },
        () => {
          console.log("Database Connected");
        }
      );
  
      app.listen(port, () => {
        console.log("Server is running on port "+port);
      });
    } catch (error) {
      console.error(error);
    }
  }
  start()



