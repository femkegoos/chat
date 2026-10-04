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