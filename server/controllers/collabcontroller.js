let express = require("express")
let router = express.Router()  // DO I NEED ANYTHING ELSE???
let validateSession = require("../middleware/validate-jwt")
const { CollabModel } = require("../models")
const Collab = require("../models/collab")

// CREATE COLLAB
router.post("/create", validateSession, async (req, res) => {
    const {collabName, collabDescription} = req.body
    const { id } = req.user
    const collabEntry = {
        collabName,
        collabDescription,
        owner_id: id
    }
    try {
        const newCollab = await CollabModel.create(collabEntry)
        res.status(200).json(newCollab)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// GET ALL OF MY COLLABS

router.get("/mine", validateSession, async (req, res) => { //works //if a user logged in, they will be able to fetch all of their items. No one would be allowed to do this unless they had this user's login information because attached to a successful login will be a sessionToken, viewable in the console after clicking inspect>console.
    let {id} = req.user
    try {
      const userCollabs = await CollabModel.findAll({
        where: {
          owner_id: id
        }
      });
      res.status(200).json(userCollabs)
    } catch (err) {
      res.status(500).json({ error: err})
    }
})

// GET MY COLLAB

router.get("/:name", async (req, res) => { //works
    const {name} = req.params
    try {
      const results = await CollabModel.findAll({
        where: {collabName: name} // left side is the column you're trying to match to in pgAdmin4 table, the right side is the input
      });
      res.status(200).json(results)
    } catch (err) {
      res.status(500).json({ error: err})
    }
  })

// UPDATE MY COLLAB

router.put("/update/:entryId", validateSession, async (req, res) => {
    const {collabName, collabDescription} = req.body.collab; // adding the ".collab", or anything after "req.body", you will need a nested object in Postman
    const collabId = req.params.entryId;
    const userId = req.user.id;
    const query = {
      where: {
        id: collabId,
        owner_id: userId
      }
    };
    const updatedCollab = {
      collabName,
      collabDescription
    }
    try {
      const update = await CollabModel.update(updatedCollab, query);
      res.status(200).json(update);
    } catch (err) {
      res.status(500).json({ error: err});
    }
  });

// DELETE MY COLLAB

router.delete('/delete/:id', validateSession, async (req, res) => {
    const userId = req.user.id;
    const collabId = req.params.id

    try {
        const query = {
            where: {
                id: collabId,
                owner_id: userId
            }
        }
        await CollabModel.destroy(query)
        res.status(200).json({ message: 'Item has successfully been deleted' })
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete item'
        })
    }
})

// ADMIN DELETE COLLAB

const admin = new AccessControl(grants)

// router.delete("/collab/:id", function (req, res, next) {
//     const permission = admin.can(req.body.collab).readAny("collab")
//     if (permission.granted) {
//         Collab.find(req.params.title, function (err, data) {
//             if (err || !data) return res.status(404).end()
//             res.json(permission.filter(data))
//         });
//     } else {
//         res.status(403).end
//     }
// })

module.exports = router