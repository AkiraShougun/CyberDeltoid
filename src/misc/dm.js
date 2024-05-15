const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function sendMessage() {
  rl.question("Enter a user ID: ", (userId) => {
    rl.question("Enter a message: ", (message) => {
      if (message === "close") {
        rl.close();
      } else {
        client.users
          .fetch(userId)
          .then((user) => {
            user
              .send(message)
              .then(() => console.log(`Message sent to ${user.tag}`))
              .catch(console.error);
            sendMessage();
          })
          .catch((err) => {
            console.log(`Couldn't find user with ID: ${userId}`);
            console.log(err);
            //sendMessage();
          });
      }
    });
  });
}
