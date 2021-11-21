let express = require("express")
let router = express.Router()  // DO I NEED ANYTHING ELSE???
let validateSession = require("../middleware/validate-jwt")
const { CryptoModel } = require("../models")


// CREATE MY CRYPTO
router.post("/create", validateSession, async (req, res) => {
    const {cryptoName, cryptoDescription} = req.body
    const { id } = req.user
    const cryptoEntry = {
        cryptoName,
        cryptoDescription,
        owner_id: id
    }
    try {
        const newCrypto = await CryptoModel.create(cryptoEntry)
        res.status(200).json(newCrypto)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// GET ALL OF MY CRYPTOS

router.get("/mine", validateSession, async (req, res) => { //works //if a user logged in, they will be able to fetch all of their items. No one would be allowed to do this unless they had this user's login information because attached to a successful login will be a sessionToken, viewable in the console after clicking inspect>console.
    let {id} = req.user
    try {
      const userCryptos = await CryptoModel.findAll({
        where: {
          owner_id: id
        }
      });
      res.status(200).json(userCryptos)
    } catch (err) {
      res.status(500).json({ error: err})
    }
})

// GET MY CRYPTO

router.get("/:name", async (req, res) => { //works
    const {name} = req.params
    try {
      const results = await CryptoModel.findAll({
        where: {cryptoName: name} // left side is the column you're trying to match to in pgAdmin4 table, the right side is the input
      });
      res.status(200).json(results)
    } catch (err) {
      res.status(500).json({ error: err})
    }
  })

// UPDATE MY CRYPTO

router.put("/update/:entryId", validateSession, async (req, res) => {
    const {cryptoName, cryptoDescription} = req.body.crypto; // adding the ".crypto", or anything after "req.body", you will need a nested object in Postman
    const cryptoId = req.params.entryId;
    const userId = req.user.id;
    const query = {
      where: {
        id: cryptoId,
        owner_id: userId
      }
    };
    const updatedCrypto = {
      cryptoName,
      cryptoDescription
    }
    try {
      const update = await CryptoModel.update(updatedCrypto, query);
      res.status(200).json(update);
    } catch (err) {
      res.status(500).json({ error: err});
    }
  });

// DELETE MY CRYPTO 

router.delete('/delete/:id', validateSession, async (req, res) => {
    const userId = req.user.id;
    const cryptoId = req.params.id

    try {
        const query = {
            where: {
                id: cryptoId,
                owner_id: userId
            }
        }
        await CryptoModel.destroy(query)
        res.status(200).json({ message: 'Item has successfully been deleted' })
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete item'
        })
    }
})

// ADMIN DELETE CRYPTO (no more meme coins)

module.exports = router