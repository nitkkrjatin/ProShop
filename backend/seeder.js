import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser }
    })

    await Product.insertMany(sampleProducts)
    console.log(`Data Imported!!!`.green.inverse)
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    console.log(`Data Destroyed!!!`.red.inverse)
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  deleteData()
} else {
  importData()
}
