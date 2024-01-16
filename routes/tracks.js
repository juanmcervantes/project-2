const express = require("express");
const route = express.Router();

const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const authMiddleware = require("../middleware/session");
// const checkRol = require("../middleware/rol");

//Listar items
route.get("/", authMiddleware, getItems);

//Obtener detalle de item
route.get("/:id", authMiddleware, validatorGetItem, getItem);

//Crear registro
route.post("/", authMiddleware, validatorCreateItem, createItem);

//Actualizar registro
route.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem); //falta update item

route.delete("/:id", authMiddleware, validatorGetItem, validatorCreateItem); //falta delete item

module.exports = route;
