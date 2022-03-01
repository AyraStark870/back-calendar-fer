const { response } = require("express");
const Event = require("../models/event");

const getEventos = async (req, res = response, next) => {
  try {
    const events = await Event.find().populate("user", "name");

    res.json({
      ok: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
const crearEvento = async (req, res = response, next) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const saveEvent = await event.save();
    res.json({
      ok: true,
      evento: saveEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
const actualizarEvento = async (req, res = response, next) => {
  const eventId = req.params.id;
  const uid = req.uid; //id del user en el token

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "este usuario no puede eliminar este evento",
      });
    }
    const newEvent = {
      ...req.body,
      user: uid,
    };
    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      updateEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = response, next) => {
  const eventId = req.params.id;
  const uid = req.uid; //id del user en el token

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "este usuario no puede eliminar este evento",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      deletedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  actualizarEvento,
  eliminarEvento,
  crearEvento,
};
