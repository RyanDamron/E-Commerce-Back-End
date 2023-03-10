const router = require('express').Router();
// const { UPSERT } = require('sequelize/types/lib/query-types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
    include: [{model: Product}],
  });
  res.status(200).json(categories);
} catch(err) {
    res.status(500).json(err);
}
  });


router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
    include: [{model: Product}],
  });
  res.status(200).json(categories);
} catch(err) {
    res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categories = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!categories[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categories) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
