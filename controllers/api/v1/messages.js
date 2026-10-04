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
