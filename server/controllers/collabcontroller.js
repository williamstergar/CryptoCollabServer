let express = require("express")
let router = express.Router()  // DO I NEED ANYTHING ELSE???
let validateSession = require("../middleware/validate-jwt")
let validateAdmin = require("../middleware/validateadmin")
// const models = require("../models")
const { models } = require("../models")
// const Collab = require("../models/collab")

// CREATE COLLAB
// router.post("/create", validateSession, async (req, res) => {
//   const { collabName, collabDescription } = req.body
//   const { id } = req.user
//   const collabEntry = {
//     collabName,
//     collabDescription,
//     owner_id: id
//   }
//   try {
//     const newCollab = await CollabModel.create(collabEntry)
//     res.status(200).json(newCollab)
//   } catch (err) {
//     res.status(500).json({ error: err })
//   }
// })

router.post("/create", validateSession, async (req, res) => {

  const { collabName, collabDescription } = req.body

  try {
    await models.CollabModel.create({
      collabName: collabName,
      collabDescription: collabDescription,
      owner_id: req.user.id
    })
      .then(
        collab => {
          res.status(201).json({
            collab: collab,
            message: "Collab created"
          })
        }
      )
  } catch (err) {
    res.status(500).json({
      error: `Failed to create collab: ${err}`
    })
  }
})

// GET ALL OF MY COLLABS

router.get("/mine", validateSession, async (req, res) => { //works //if a user logged in, they will be able to fetch all of their items. No one would be allowed to do this unless they had this user's login information because attached to a successful login will be a sessionToken, viewable in the console after clicking inspect>console.
  let { id } = req.user
  try {
    const userCollabs = await models.CollabModel.findAll({
      where: {
        owner_id: id
      }
    });
    res.status(200).json(userCollabs)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// GET ALL USER COLLABS

router.get("/all", validateAdmin, async (req, res) => { //works //if a user logged in, they will be able to fetch all of their items. No one would be allowed to do this unless they had this user's login information because attached to a successful login will be a sessionToken, viewable in the console after clicking inspect>console.
  let { id } = req.user
  try {
    const userCollabs = await models.CollabModel.findAll();
    res.status(200).json(userCollabs)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// GET MY COLLAB

router.get("/:name", async (req, res) => { //works
  const { name } = req.params
  try {
    const results = await models.CollabModel.findAll({
      where: { collabName: name } // left side is the column you're trying to match to in pgAdmin4 table, the right side is the input
    });
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// UPDATE MY COLLAB

router.put("/update/:entryId", validateSession, async (req, res) => {
  const { collabName, collabDescription } = req.body.collab; // adding the ".collab", or anything after "req.body", you will need a nested object in Postman
  const collabId = req.params.entryId;
  const owner_id = req.user.id;
  const query = {
    where: {
      id: collabId,
      owner_id: owner_id
    }
  };
  const updatedCollab = {
    collabName,
    collabDescription,
    owner_id
  }
  try {
    const update = await models.CollabModel.update(updatedCollab, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// DELETE MY COLLAB

router.delete("/delete/:id", validateSession, async (req, res) => {
  const userId = req.user.id;
  const collabId = req.params.id

  try {
    const query = {
      where: {
        id: collabId,
        owner_id: userId
      }
    }
    await models.CollabModel.destroy(query)
    res.status(200).json({ message: "Collab has successfully been deleted" })
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete collab"
    })
  }
})

// ADMIN DELETE COLLAB

router.delete("/admin/collab/delete/:id", validateAdmin, async (req, res) => {
  const userId = req.user.id;
  const collabId = req.params.id

  try {
    const query = {
      where: {
        id: collabId,
        userId: userId
      }
    }
    await models.CollabModel.destroy(query)
    res.status(200).json({ message: "User's collab has been successfully deleted" })
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete user's collab"
    })
  }
})

module.exports = router