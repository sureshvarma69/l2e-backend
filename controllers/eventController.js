
const moment = require("moment");
const crypto = require('crypto');
const uuid = crypto.randomUUID();
const Event = require("../models/eventsModel");
const Application = require("../models/jobApplications");

const AddorUpdateEvent = async (req,res) => {
    try {
        const {
            appUserId,
            host,
            guest,
            fromEpoch,
            toEpoch,
            description,
            name,
            others,
            eventId,
            url,
            guestDetails
        } = req.body
        if (eventId) {
            const findEvent = await Event.findOne({eventId: eventId});
            if (findEvent) {

                    // If the company exists, update its properties
                    findEvent.host = host;
                    findEvent.guest = guest;
                    findEvent.fromEpoch = fromEpoch;
                    findEvent.toEpoch = toEpoch;
                    findEvent.description = description;
                    findEvent.name = name;
                    findEvent.others = others;
                    findEvent.url = url;
                    findEvent.guestDetails =guestDetails
                    // Save the updated company
                    await findEvent.save();
                    return res.status(200).json({
                        message: "Event updated successfully",
                        event: findEvent,
                    });

            }
            else return res.status(204).json({"message": "Event not found"})
        }else {
            const newEvent = new Event({
                eventId: `event_id_${uuid}`,
                host,
                guest,
                fromEpoch,
                toEpoch,
                description,
                name,
                others,
                url,
                guestDetails,
                "metaInfo.createdBy": appUserId
            });
            await newEvent.save();
            return res.status(200).json({
                message: "Job Applied successfully",
                event: newEvent,
            });
        }
    }catch(e) {
            console.log("Error while adding or updating event", e)
            res.status(500).json({"error": "Error while adding or updating event"})
    }
}

const getMyEvents = async (req,res) =>{
    try{
        const {appUserId} = req.params;
        const getMyEvents = await Event.find({appUserId:appUserId});
        return res.status(200).json({data:getMyEvents ? getMyEvents :[]})
    }catch (e) {
        console.log("Error while getting events", e)
        res.status(500).json({"error": "Error while getting event"})
    }
}

module.exports = {
    AddorUpdateEvent,
    getMyEvents
}