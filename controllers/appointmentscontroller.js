const router = require('express').Router();
const Appointments = require('../db').import('../models/appointments');
const validateSession = require('../middleware/validate-session');


router.post('/create', validateSession, (req, res) => {
    const appointmentsEntry = {
        type: req.body.type,
        date: req.body.date,
        time: req.body.time,
        place: req.body.place,
        note: req.body.note,
        owner: req.user.id
    }
    Appointments.create(appointmentsEntry)
        .then(appointments => res.status(200).json(appointments))
        .catch(err => res.status(500).json({ error: err }))
});

router.get("/allappointments", (req, res) => {
    Appointments.findAll()
        .then(appointments => res.status(200).json(appointments))
        .catch(err => res.status(500).json({ error: err }))
});

router.get("/myappointments", validateSession, (req, res) => {
    let userId = req.user.id;
    Appointments.findAll({
        where: { owner: userId }
    })
    .then(appointments => res.status(200).json(appointments))
})

router.delete("/delete/:id", validateSession, (req, res) => {
    Appointments.destroy({
        where: { owner:req.user.id, id:req.params.id }
    })
        .then(appointments => res.status(200). json(appointments))
        .catch(err => res.status(500).json({ error: err }))
})


    module.exports = router; 