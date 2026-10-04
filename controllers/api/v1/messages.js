// Statische array als nepdatabank
let messages = [
  { _id: 1, user: 'Smiski', text: 'Moshi moshi!' },
  { _id: 2, user: 'pookie', text: 'Hey Hoi!' },
  { _id: 3, user: 'Kuromi', text: 'Hello Kitty!' }
]

// Geeft alle berichten terug, of enkel die van één user
export const list = (req, res, next) => {
  const { user } = req.query

  if (user) {
    const userMessages = messages.filter(
      (m) => m.user.toLowerCase() === user.toLowerCase()
    )

    return res.json({
      status: 'success',
      message: `Messages from user ${user}`,
      data: { messages: userMessages }
    })
  }

  res.json({
    status: 'success',
    message: 'GETTING messages',
    data: { messages: messages }
  })
}

// Geeft één bericht terug op basis van id, anders 404
export const show = (req, res, next) => {
  const message = messages.find((m) => String(m._id) === req.params.id)

  if (!message) {
    return res.status(404).json({
      status: 'fail',
      message: `Message ${req.params.id} not found`,
      data: { id: req.params.id }
    })
  }

  res.json({
    status: 'success',
    message: `GETTING message ${req.params.id}`,
    data: { message: message }
  })
}

// Voegt een nieuw bericht toe aan de array
export const create = (req, res, next) => {
  const newData = req.body.message

  if (!newData || !newData.user || !newData.text) {
    return res.status(400).json({
      status: 'fail',
      message: 'User and text are required',
      data: { message: null }
    })
  }

  const newMessage = {
    user: newData.user,
    text: newData.text,
    _id: Date.now().toString(),
    __v: 0
  }

  messages.push(newMessage)

  res.json({
    status: 'success',
    message: 'Message saved',
    data: { message: newMessage }
  })
}

// Past een bestaand bericht aan op basis van id
export const update = (req, res, next) => {
  const message = messages.find((m) => String(m._id) === req.params.id)
  const changes = req.body.message

  if (!message) {
    return res.status(404).json({
      status: 'fail',
      message: `Message ${req.params.id} not found`,
      data: { id: req.params.id }
    })
  }

  if (!changes) {
    return res.status(400).json({
      status: 'fail',
      message: 'Message is required',
      data: { message: null }
    })
  }

  if (changes.user) message.user = changes.user
  if (changes.text) message.text = changes.text

  res.json({
    status: 'success',
    message: 'Message updated',
    data: { message: message }
  })
}

// Verwijdert één bericht uit de array op basis van id
export const destroy = (req, res, next) => {
  const index = messages.findIndex((m) => String(m._id) === req.params.id)

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Message ${req.params.id} not found`,
      data: { id: req.params.id }
    })
  }

  messages.splice(index, 1)

  res.json({
    status: 'success',
    message: 'Message deleted',
    data: { message: { _id: req.params.id } }
  })
}