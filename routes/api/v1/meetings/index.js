const express = require('express')
const router = express.Router()
const { Meeting } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const meetings = await Meeting.findAll()

  res.send(meetings)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const meeting = await Meeting.findOne({ where: { id } })

  res.send(meeting)
})

router.post('/', auth, async function (req, res, next) {
  const meeting = await Meeting.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(meeting)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Meeting.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const meeting = await Meeting.findOne({ where: { id } })

  meeting.name = req.body.name

  meeting.save()

  res.send(meeting)
})

module.exports = router
