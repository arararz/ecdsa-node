const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02d3eef3531c4bf0f7b85dbf13fd22e0365e7c33b061db51b12f7d2e18ce12a1f9": 100,
  "02ce065bc8dbffc2a140759196dff9f8d1d7e318bba3a169380b2c19bfec42254a": 50,
  "02aa66e0e7d715560e4d0b7217bf93b403d6dc2a08a49175fe2d8dffac0e3c856f": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
