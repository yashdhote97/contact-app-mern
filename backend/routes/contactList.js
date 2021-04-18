const router = require("express").Router();
let Contact = require("../models/Contact");
const verifyToken = require("./verifyToken");
let User = require("../models/User");

// router.get("/",verifyToken,(req,res)=>{
//     res.send("This is the Secret page");
// });

router.route("/").get((req, res) => {

  // let user = User.find({_id:res.user._id});
    Contact.find()
      .then((contacts) => res.json(contacts))
      .catch((err) => res.status(400).json("ERROR: " + err));
});
router.route("/add").post(verifyToken,(req, res) => {
  console.log(res.user._id);
  const { name, email, address } = req.body;
  const userId = "batwayne@gmail.com";
  const phone = Number(req.body.phone);

  const newContact = new Contact({
    name,
    email,
    address,
    phone,
    userId
  });

  newContact
    .save()
    .then(() => res.json("Contact Added!"))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router
  .route("/:id")
  .get((req, res) => {
    Contact.findById(req.params.id)
      .then((contact) => res.json(contact))
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .delete((req, res) => {
    Contact.findByIdAndDelete(req.params.id)
      .then(() => res.json("Contact deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router.route("/update/:id").post(verifyToken,(req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = Number(req.body.phone);
      contact.address = req.body.address;

      contact
        .save()
        .then(() => res.json("Contact updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;