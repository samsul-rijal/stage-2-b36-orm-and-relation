// import models here
const {product, user} = require("../../models")

exports.getProduct = async (req, res) => {
  // code here

  try { 
    const data = await product.findAll({
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"]
      }
    })

    res.status(200).send({
      status: "success",
      data
    })

  } catch (error) {
    console.log(error);  
    res.status(400).send({
      status: "failed",
      data
    }) 
  }

};

exports.addProduct = async (req, res) => {
  // code here

  try {

    const data = req.body
    await product.create(data)

    res.status(201).send(({
      status: "success",
      message: "Add product success"
    }))

    
  } catch (error) {
    console.log(error);  
    res.status(400).send({
      status: "failed",
      message: "server error"
    }) 
  }
};
