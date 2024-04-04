import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function sendMessage() {
  rl.question("Enter a message: ", (message) => {
    if (message === "close") {
      rl.close();
    } else {
      client.channels.cache.get(`${process.env.CHANNEL_ID}`).send(message);
      sendMessage();
    }
  });
}
