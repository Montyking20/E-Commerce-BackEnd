const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
})  
  res.status(200).json(categoryData)
  } catch (err) {
  res.status(500).json(err)  
  } 
});

router.get('/:id', async (req, res) => {
  try {
  const categoryData = await Category.findByPk(req.params.id, { include: [{ model: Product }],
})
  if (!categoryData) {
    res.status(404).json({ message: 'ID found not in that category.'});
  return;
}
    res.status(200).json(categoryData)
  } 
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
  const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } 
  catch (err) {
    res.status(500).json
  }
});

router.put('/:id', async (req, res) => {
  try {
  const categoryData = await Category.update({ category_name: req.body.category_name }, {
    where: {
    id: req.params.id,
  }
})
  if (!categoryData) {
    res.status(404).json({ message: 'No category not with that id.' });
  return;
}
  const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json(updatedCategory)
  } 
  catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
  const categoryData = await Category.destroy({
    where: {
    id: req.params.id,
  }
})
  if (!categoryData) {
    res.status(404).json({ message: 'No category not with that id.' });
      return;
}
    res.status(200).json({ message: `Category with id ${req.params.id} successfully deleted.`})
  } 
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
