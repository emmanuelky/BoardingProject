const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const Event = require("../models/Event");
const Join = require("../models/Join");
const User = require("../models/User");
const mapbox = require("../public/javascripts/geocode");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/events", (req, res, next) => {
  // By default, we don't sort

  if(req.query.game){
    const maxDistance = req.user.maxDistance * 1000;
    var lng = req.user.loc.coordinates[0];
    var lat = req.user.loc.coordinates[1];
  
    Game.find({ name: req.query.game }).then(game => {
      Promise.all([
        Join.find({ _user: req.user._id }).lean(),
        Event.find({
          _game: game[0]._id,
          loc: {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates: [lng, lat]
              },
              $maxDistance: maxDistance
            }
          }
        })
          .populate("_game")
          .populate("_user")
          .lean()
      ])
        .then(([usersEvents, allEvents]) => {
  
          res.render("events", {
            allEvents: allEvents.map(event => ({
              ...event,
              isJoined: usersEvents.some(
                join =>
                  join._user.equals(req.user._id) && join._event.equals(event._id)
              ),
              isOwner: event._user._id.equals(req.user._id) ? true : false,
              isSoldOut: event.slot === 0 ? true : false
            })),
            errorMessage: req.flash("errorMessage")[0]
          });
        })
        .catch(err => console.log(err));
    });
  }else{

  
  let betweenDates = {}
  
  if(req.query.start && req.query.end){
  betweenDates = {$and:[{date:{$lte:req.query.end}},{date:{$gte:req.query.start}}]}
  }
  let sortArg = {}
  if (req.query.sort === 'date') {
    sortArg = { date: 1 }
  }
  

  const maxDistance = req.user.maxDistance * 1000;
  Promise.all([
    Join.find({ _user: req.user._id }).lean(),
    Event.
    find({$and:[{loc: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: req.user.loc.coordinates
        },
        $maxDistance: maxDistance,
        }
    }}, betweenDates]
      })
      .sort(sortArg)
      .populate("_game")
      .populate("_user")
      .lean()
  ])
    .then(([usersEvents, allEvents]) => {
      res.render("events", {
        allEvents: allEvents.map(event => ({
          ...event,
          isJoined: usersEvents.some(
            join =>
              join._user.equals(req.user._id) && join._event.equals(event._id)
          ),
          isOwner: event._user._id.equals(req.user._id) ? true : false,
          isSoldOut: event.slot === 0 ? true : false
        })),
        errorMessage: req.flash("errorMessage")[0]
      });
    })
    .catch(err => console.log(err));}
})

//GET add-event page
router.get("/add-event", (req, res, next) => {
  if (!req.user) {
    // req.flash("errorMessage", "You need to be connected to add a link");
    res.redirect("/auth/login");
    return;
  }
  Game.find().sort( { name: 1 } ).then(games => {
    res.render("add-event", { games });
  });
});

//POST add-event
router.post("/add-event", (req, res, next) => {
  const { address, date, _game, description, slot } = req.body;
  const _user = req.user._id;

  mapbox(
    process.env.MAPBOX_KEY,
    `${address}`,
    function (err, data) {
      const newEvent = new Event({
        address,
        loc: {
          type: "Point",
          coordinates: data.features[0].center
        },
        date,
        _game,
        description,
        slot,
        _user
      });

      newEvent
        .save()
        .then(event => {
          res.redirect("/events");
        })
        .catch(err => console.log(err));
      
    }
  );
});


//GET edit-event and renders the page
router.get("/edit-event/:eventId", (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
    return;
  }
  Promise.all([
    Event.findOne({ _id: req.params.eventId }).populate("_game"),
    Game.find().sort( { name: 1 })
  ])
    .then(([event, games]) => {
      console.log(event)
      res.render("edit-event", {
        event,
        games
      })
    });
});

router.post("/edit-event/:eventId", (req, res, next) => {

  const { address, _game, date, description, slot } = req.body;


  mapbox(
    process.env.MAPBOX_KEY,
    `${address}`,
    function (err, data) {
      Event.findOneAndUpdate(
        { _id: req.params.eventId },
        {
          $set: {
            address,
            loc: {
              type: "Point",
              coordinates: data.features[0].center
            },
            date,
            _game,
            description,
            slot
          }
        }
      )
        .then(event => res.redirect('/events'))
    }
  );
});

//GET event sorted by distance USER coordinates
router.get("/events-user-coord", (req, res, next) => {
  const maxDistance = req.user.maxDistance * 1000;
  Promise.all([
    Join.find({ _user: req.user._id }).lean(),
    Event.find({
      loc: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: req.user.loc.coordinates
          },
          $maxDistance: maxDistance // in meters
        }
      }
    })
      .populate("_game")
      .populate("_user")
      .lean()
  ])
    .then(([usersEvents, allEvents]) => {
      res.render("events", {
        allEvents: allEvents.map(event => ({
          ...event,
          isJoined: usersEvents.some(
            join =>
              join._user.equals(req.user._id) && join._event.equals(event._id)
          ),
          isOwner: event._user._id.equals(req.user._id) ? true : false,
          isSoldOut: event.slot === 0 ? true : false
        })),
        errorMessage: req.flash("errorMessage")[0]
      });
    })
    .catch(err => console.log(err));
});



//GET join
router.get("/join-event/:eventId", (req, res, next) => {
  const _event = req.params.eventId;
  const _user = req.user._id;

  const newJoin = new Join({
    _event,
    _user
  });

  newJoin
    .save()
    .then(() => {
      Event.update({ _id: req.params.eventId }, { $inc: { slot: -1 } })
        .then(() => {
          res.redirect("/events");
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//GET cancel join
router.get("/cancel-event-join/:eventId", (req, res, next) => {
  Join.findOneAndRemove({ _event: req.params.eventId, _user: req.user._id })
    .then(() => {
      Event.update({ _id: req.params.eventId }, { $inc: { slot: +1 } })
        .then(() => {
          res.redirect("/events");
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//GET cancel EVENT
router.get("/cancel-event/:eventId", (req, res, next) => {
  Promise.all([
    Event.findOneAndDelete({ _id: req.params.eventId }),
    Join.deleteMany({ _event: req.params.eventId }).exec()
  ])
    .then(() => res.redirect(`/profile/${req.user._id}`))
    .catch(err => console.log(err));
});

//get user profile
router.get("/profile/:userId", (req, res, next) => {
  Promise.all([
    User.findOne({ _id: req.params.userId }),
    Join.find({ _user: req.params.userId })
      .populate({
        path: "_event",
        populate: {
          path: "_game",
          model: "Game"
        }
      })
      .lean(),
    Event.find({ _user: req.params.userId }).populate("_game")
  ])
    .then(([user, join, event]) => {

      res.render("profile", { user, join, event });
    })
    .catch(err => console.log(err));
});

//GET find by game-name from search using gameId
// router.get("/events-byname", (req, res, next) => {
  
// });

//GET update POSITION USER
router.get("/update-maxDistance-user/:range", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { maxDistance: req.params.range } })
    .then(() => {
      res.redirect(`/profile/${req.user._id}`)
    })
})


//GET event DETAIL page
router.get('/detail-event/:eventId', (req, res) => {
  Promise.all([
    Join.find({ _event: req.params.eventId }).populate("_user").lean(),
    Event.findOne({ _id: req.params.eventId })
      .populate("_game")
      .populate("_user")
      .lean()
  ]).then(([partecipantsEvent, event]) => {
    partecipantsEvent = partecipantsEvent.map(partecipant => {
      return { user: partecipant._user.username }
    })

    console.log('partecipantsEvent', partecipantsEvent)
    console.log('req.user.username', req.user.username)

    res.render('detail-event', {
      eventDetail: {
        event: {
          ...event,
          isJoined: partecipantsEvent.some(
            join =>
              join.user === req.user.username
          ),
          isOwner: event._user._id.equals(req.user._id) ? true : false,
          isSoldOut: event.slot === 0 ? true : false
        }
        ,
        partecipantsEvent
      }
    })
  })
})

router.post("/update-position-user", (req, res, next) => {
  const position = req.body.position

  mapbox(
    process.env.MAPBOX_KEY,
    `${position}`,
    function (err, data) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            position: position,
            loc: {
              type: "Point",
              coordinates: data.features[0].center
            }
          }
        })
        .then(() => {
          res.redirect(`/profile/${req.user._id}`)
        })
        .catch(err => console.log(err))
    });
  // newUser.save()
  // .then(() => {
  // res.redirect("/");
  // })
  // .catch(err => {
  // res.render("auth/signup", { message: "Something went wrong" });
  // })
})





module.exports = router;