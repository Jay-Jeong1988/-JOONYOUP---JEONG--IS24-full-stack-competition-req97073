const express = require('express');
const router = express.Router();
const fs = require("fs");


router.get('/all', function(req, res, next) {
  fs.readFile("./db/products.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      const products = JSON.parse(jsonString);
      res.status(200).json(products);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
})

router.get('/:productId', function(req, res, next) {
  fs.readFile("./db/products.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      const products = JSON.parse(jsonString);
      for (let product of products) {
        if (product['productId'] == req.params.productId) {
          res.status(200).json(product);
        }
      }
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
})

router.post('/create', (req, res) => {
  
  const newProduct = {
    productId: objectId(),
    productName: req.body.productName,
    scrumMasterName: req.body.scrumMasterName,
    productOwnerName: req.body.productOwnerName,
    developers: req.body.developers,
    startDate: req.body.startDate,
    methodology: req.body.methodology
  }
  fs.readFile("./db/products.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    // add newly created product to products array
    const products = JSON.parse(jsonString);
    products.push(newProduct)
    const newJsonString = JSON.stringify(products, null, 2)
    fs.writeFile('./db/products.json', newJsonString, err => {
      if (err) {
        res.status(500).json({
          error: err.message
        })
        console.log('Error writing file', err)
      } else {
        res.status(200).json(products);
        console.log('Successfully wrote file')
      }
    })
  });
})

function objectId() {
  const os = require('os');
  const crypto = require('crypto');

  const secondInHex = Math.floor(new Date()/1000).toString(16);
  const machineId = crypto.createHash('md5').update(os.hostname()).digest('hex').slice(0, 6);
  const processId = process.pid.toString(16).slice(0, 4).padStart(4, '0');
  const counter = process.hrtime()[1].toString(16).slice(0, 6).padStart(6, '0');

  return secondInHex + machineId + processId + counter;
}
// router.get('/edit', (req, res)=>{
//   updateUser(req.query.nickname).then(() => {
//       res.status(200).send("success");
//   });

//   async function updateUser(nickname){
//       await User.findOne({nickname: nickname}, function(err, user) {
//           if (err) res.status(500).send(err);
//           user.nickname = "JustMusic";
//           user.save().then( updatedUser => {
//               console.log(updatedUser + " is updated");
//           }).catch(err => {
//               result.push(err.message);
//           });
//       })
//   }
// })


module.exports = router;
