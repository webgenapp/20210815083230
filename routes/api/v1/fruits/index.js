const express = require('express')
const router = express.Router()
const { Fruit } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const fruits = await Fruit.findAll()

  res.send(fruits)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const fruit = await Fruit.findOne({ where: { id } })

  res.send(fruit)
})

router.post('/', auth, async function (req, res, next) {
  const fruit = await Fruit.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(fruit)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Fruit.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const fruit = await Fruit.findOne({ where: { id } })

  fruit.name = req.body.name

  fruit.save()

  res.send(fruit)
})

module.exports = router
