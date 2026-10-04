let messages = [
    {_id: 1, user: 'Smiski', text: 'Moshi moshi!'},
    {_id: 2, user: 'pookie', text: 'Hey Hoi!'},
    {_id: 3, user: 'Kuromi', text: 'Hello Kitty!'},
];

export const list = (req, res, next) => {
  res.json({
    status: 'success',
    message: 'GETTING messages',
    data: {messages: messages}
  });
}

export const show = (req, res, next) => {
    const message = messages.find((m) => String(m._id) === req.params.id)

    if (!message) {
        return res.status(404).json({
            status: 'fail',
            message: `Message ${req.params.id} not found`,
            data: {id: req.params.id}
        })
    }
    res.json({
        status: 'success',
        message: `GETTING message ${req.params.id}`,
        data: {message: message}
    })}

    export const create = (req, res, next) => {
    const newData = req.body.message
    if (!newData || !newData.user || !newData.text) {
        return res.status(400).json({
            status: 'fail',
            message: 'User and text are required',
            data: {message: null}
        })
    }

    const newMessage = {
        __v: 0,
        _id: Date.now().toString(),
        user: newData.user,
        text: newData.text
    }
    messages.push(newMessage)
    
    res.json({
        status: 'success',
        message: 'CREATING message',
        data: {message: newMessage}
    })
}

export const update = (req, res, next) => {
    const message = messages.find((m) => String(m._id) === req.params.id)
    const changes = req.body.message

    if (!message) {
        return res.status(404).json({
            status: 'fail',
            message: `Message ${req.params.id} not found`,
            data: {id: req.params.id}
        })
    }
    if (!changes) {
        return res.status(400).json({
            status: 'fail',
            message: 'Message is required',
            data: {message: null}
        })
    }
    if (changes.user) message.user = changes.user
    if (changes.text) message.text = changes.text

    res.json({
        status: 'success',
        message: 'Message updated',
        data: {message: message}
    })}