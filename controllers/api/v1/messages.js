
import Message from "../../../models/api/v1/Message.js"


// Geeft alle berichten terug, of enkel die van één user
export const list = async(req, res, next) => {

  const messages = await Message.find({});
  
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
export const create = async(req, res, next) => {
  
try{
   let message = new Message()
  message.text = req.body.text;
message.username = req.body.username;

  await message.save();
  const result = {
    status: "succes",
    data:{
      message:message,
    },
  };
  res.status(200).json(result);
}
catch (err){
   const result = {
    status: "error",
    data:{
      message:"oops",
    },
  };
  res.status(500).json(result);

}
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
export const update = async (req, res, next) => {
  try {
    const changes = req.body

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        username: changes.username,
        text: changes.text
      },
      { new: true }
    )

    if (!message) {
      return res.status(404).json({
        status: 'fail',
        message: `Message ${req.params.id} not found`
      })
    }

    res.json({
      status: 'success',
      message: 'Message updated',
      data: {
        message: message
      }
    })

  } catch (err) {
    next(err)
  }
}
// Verwijdert één bericht uit de array op basis van id
export const destroy = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)

    if (!message) {
      return res.status(404).json({
        status: 'fail',
        message: `Message ${req.params.id} not found`
      })
    }

    res.json({
      status: 'success',
      message: 'Message deleted'
    })

  } catch (err) {
    next(err)
  }
}