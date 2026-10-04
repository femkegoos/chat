let messages = [];

export const list = (req, res, next) => {
  res.json({
    status: 'success',
    message: 'GETTING messages',
    data: {messages:messages}
  });
}
