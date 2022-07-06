// import models here
const {transaction, product, user} = require("../../models");

exports.getTransactions = async (req, res) => {
  // code here

  try {
    
    const data = await transaction.findAll({
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
        {
          model: user,
          as: "buyer",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
        {
          model: user,
          as: "seller",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idBuyer","idSeller","idProduct"]
      }
    })

    res.send({
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

exports.addTransaction = async (req, res) => {
  // code here

  try {

    const data = req.body
    await transaction.create(data)

    res.status(201).send(({
      status: "success",
      message: "Add transaction success"
    }))

    
  } catch (error) {
    console.log(error);  
    res.status(400).send({
      status: "failed",
      message: "server error"
    }) 
  }
};
