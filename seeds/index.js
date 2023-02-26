const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');
const { Tag, ProductTag, Product, Category } = require('../models');

const sequelize = require('../config/connection');
const tagData = require('./tag-seeds.json');
const productTagData = require('./product-tag-seeds.json');
const productData = require('./product-seeds.json');
const categoryData = require('./category-seeds.json')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  

  console.log('\n----- DATABASE SYNCED -----\n');
  await Category.bulkCreate(categoryData);
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await Product.bulkCreate(productData);
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await Tag.bulkCreate(tagData);
  console.log('\n----- TAGS SEEDED -----\n');

  await ProductTag.bulkCreate(productTagData);
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
