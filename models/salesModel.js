const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionName = 'sales';

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection(collectionName).find().toArray())
    .catch((err) => console.log(err));
  return sales;
};

const findById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection(collectionName).findOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
  return sale;
};

const deleteById = async (id) => {
  await connection()
    .then((db) => db.collection(collectionName).deleteOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
};

const create = async (itensSold) => {
  const db = await connection();
  const saleCreated = await db.collection(collectionName).insertOne({ itensSold })
    .then((result) => ({ _id: result.insertedId, itensSold }))
    .catch((err) => console.log(err));
  return saleCreated;
};

const update = async (id, itensSold) => {
  const saleUpdated = await connection()
    .then((db) => db.collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }))
    .then(() => ({ _id: id, itensSold }))
    .catch((err) => console.log(err));
  return saleUpdated;  
};

module.exports = { getAll, findById, deleteById, create, update }; 