let messages = [
    {id: 1, user: 'Smiski', message: 'Moshi moshi!'},
    {id: 2, user: 'pookie', message: 'Hey Hoi!'},
    {id: 3, user: 'Kuromi', message: 'Hello Kitty!'},
];

export const list = (req, res, next) => {
  res.json({
    status: 'success',
    message: 'GETTING messages',
    data: {messages:messages}
  });
}

export const show = (req, res, next) => {
    const message = messages.find((m) => m.id === req.params.id)

    if (!message) {
        return res.status(404).json({
            status: 'fail',
            message: 'Message not found',
            data: {id: req.params.id}
        })
    }
    res.json({
        status: 'success',
        message: 'GETTING message',
        data: {message}
    })}