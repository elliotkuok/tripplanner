const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');

const User = require('../models/User');
const Itinerary = require('../models/Itinerary');
const Activity = require('../models/Activity');
const Day = require('../models/Day');
const bcrypt = require('bcryptjs');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    await insertSeeds();
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = async () => {
  console.log("Resetting db and seeding users, itineraries, activities, and days...");

  try {
    await User.collection.drop();
    await Itinerary.collection.drop();
    await Activity.collection.drop();
    await Day.collection.drop();

    // Hardcode users
    const users = [];

    const u1 = new User({
      username: 'seed1',
      email: 'seed1@seed.com',
      hashedPassword: bcrypt.hashSync('password', 10)
    });
    users.push(u1);

    const u2 = new User({
      username: 'willyFog',
      email: 'willy@mail.com',
      hashedPassword: bcrypt.hashSync('password', 10)
    });
    users.push(u2);

    const u3 = new User({
      username: 'kimJongun',
      email: 'kim@mail.com',
      hashedPassword: bcrypt.hashSync('password', 10)
    });
    users.push(u3);

    const u4 = new User({
      username: 'jackieChan',
      email: 'jackie@mail.com',
      hashedPassword: bcrypt.hashSync('password', 10)
    });
    users.push(u4);

    const createdUsers = await User.insertMany(users);

    const activities = []

    const act1 = new Activity({
      title: 'Golden Circle Tour',
      length: 1
    });
    activities.push(act1);

    const act2 = new Activity({
      title: 'Blue Lagoon',
      length: 1
    });
    activities.push(act2);

    const act3 = new Activity({
      title: 'Reykjavik City Tour',
      length: 1
    });
    activities.push(act3);

    const act4 = new Activity({
      title: 'Glacier Hike',
      length: 1
    });
    activities.push(act4);

    const act5 = new Activity({
      title: 'Waterfall Expedition',
      length: 1
    });
    activities.push(act5);

    const act6 = new Activity({
      title: 'Whale Watching',
      length: 1
    });
    activities.push(act6);

    const act7 = new Activity({
      title: 'Hot Springs Relaxation',
      length: 1
    });
    activities.push(act7);

    const act8 = new Activity({
      title: 'Volcano Trek',
      length: 1
    });
    activities.push(act8);

    const act9 = new Activity({
      title: 'Ice Cave Tour',
      length: 1
    });
    activities.push(act9);

    const act10 = new Activity({
      title: 'Snorkeling Adventure',
      length: 1
    });
    activities.push(act10);

    const act11 = new Activity({
      title: 'Northern Lights Hunt',
      length: 1
    });
    activities.push(act11);

    const act12 = new Activity({
      title: 'Black Sand Beach Visit',
      length: 1
    });
    activities.push(act12);

    const act13 = new Activity({
      title: 'Fjord Exploration',
      length: 1
    });
    activities.push(act13);

    const act14 = new Activity({
      title: 'Local Cuisine Tasting',
      length: 1
    });
    activities.push(act14);

    const act15 = new Activity({
      title: 'Reykjavik Art Galleries',
      length: 1
    });
    activities.push(act15);

    const act16 = new Activity({
      title: 'Cultural Experience',
      length: 1
    });
    activities.push(act16);

    const act17 = new Activity({
      title: 'Reykjavik Exploration',
      length: 1
    });
    activities.push(act17);

    const act18 = new Activity({
      title: 'Volcano Exploration',
      length: 1
    });
    activities.push(act18);

    const act19 = new Activity({
      title: 'Nature Photography',
      length: 1
    });
    activities.push(act19);

    const act20 = new Activity({
      title: 'Mountain Trek',
      length: 1
    });
    activities.push(act20);

    const act21 = new Activity({
      title: 'Wildlife Safari',
      length: 1
    });
    activities.push(act21);

    const act22 = new Activity({
      title: 'Bird Watching',
      length: 1
    });
    activities.push(act22);

    const act23 = new Activity({
      title: 'Historical Tour',
      length: 1
    });
    activities.push(act23);

    const act24 = new Activity({
      title: 'Museum Visits',
      length: 1
    });
    activities.push(act24);

    const act25 = new Activity({
      title: 'Local Markets Visit',
      length: 1
    });
    activities.push(act25);

    const act26 = new Activity({
      title: 'Boat Excursion',
      length: 1
    });
    activities.push(act26);

    const act27 = new Activity({
      title: 'Mountain Biking',
      length: 1
    });
    activities.push(act27);

    const act28 = new Activity({
      title: 'Horseback Riding',
      length: 1
    });
    activities.push(act28);

    const act29 = new Activity({
      title: 'Kayaking Adventure',
      length: 1
    });
    activities.push(act29);

    const act30 = new Activity({
      title: 'Nature Walk',
      length: 1
    });
    activities.push(act30);

    const act31 = new Activity({
      title: 'Forest Exploration',
      length: 1
    });
    activities.push(act31);

    const act32 = new Activity({
      title: 'Scenic Drive',
      length: 1
    });
    activities.push(act32);

    const act33 = new Activity({
      title: 'Local Art Workshop',
      length: 1
    });
    activities.push(act33);

    const act34 = new Activity({
      title: 'Adventure Photography',
      length: 1
    });
    activities.push(act34);

    const act35 = new Activity({
      title: 'Sailing Excursion',
      length: 1
    });
    activities.push(act35);

    const act36 = new Activity({
      title: 'Nature Meditation',
      length: 1
    });
    activities.push(act36);

    const createdActivities = await Activity.insertMany(activities);

    const days = [];

    // Day 1
    const day1Activities = [act1.id, act2.id];
    const d1 = new Day({
      accommodation: 'Harbor Hotel Reykjavik',
      activities: day1Activities
    });
    days.push(d1);

    // Day 2
    const day2Activities = [act3.id, act4.id, act5.id];
    const d2 = new Day({
      accommodation: 'Blue Lagoon Spa Hotel',
      activities: day2Activities
    });
    days.push(d2);

    // Day 3
    const day3Activities = [act6.id, act7.id];
    const d3 = new Day({
      accommodation: 'Hofn Glacier Inn',
      activities: day3Activities
    });
    days.push(d3);

    // Day 4
    const day4Activities = [act8.id, act9.id];
    const d4 = new Day({
      accommodation: 'Akureyri Guesthouse',
      activities: day4Activities
    });
    days.push(d4);

    // Day 5
    const day5Activities = [act10.id];
    const d5 = new Day({
      accommodation: 'CenterHotel Midgardur',
      activities: day5Activities
    });
    days.push(d5);

    // Day 6
    const day6Activities = [act11.id, act12.id];
    const d6 = new Day({
      accommodation: 'Hotel Borg',
      activities: day6Activities
    });
    days.push(d6);

    // Day 7
    const day7Activities = [act13.id, act14.id, act15.id];
    const d7 = new Day({
      accommodation: 'Hofn Glacier Inn',
      activities: day7Activities
    });
    days.push(d7);

    // Day 8
    const day8Activities = [act16.id, act17.id];
    const d8 = new Day({
      accommodation: 'Fosshotel Vatnajokull',
      activities: day8Activities
    });
    days.push(d8);

    // Day 9
    const day9Activities = [act18.id, act19.id];
    const d9 = new Day({
      accommodation: 'Akureyri Guesthouse',
      activities: day9Activities
    });
    days.push(d9);

    // Day 10
    const day10Activities = [act20.id];
    const d10 = new Day({
      accommodation: 'Reykjavik Marina Residence',
      activities: day10Activities
    });
    days.push(d10);

    // Day 11
    const day11Activities = [act21.id, act22.id];
    const d11 = new Day({
      accommodation: 'Hotel Glymur',
      activities: day11Activities
    });
    days.push(d11);

    // Day 12
    const day12Activities = [act23.id, act24.id, act25.id];
    const d12 = new Day({
      accommodation: 'Canopy by Hilton Reykjavik City Centre',
      activities: day12Activities
    });
    days.push(d12);

    // Day 13
    const day13Activities = [act26.id, act27.id];
    const d13 = new Day({
      accommodation: 'Fosshotel Reykjavik',
      activities: day13Activities
    });
    days.push(d13);

    // Day 14
    const day14Activities = [act28.id, act29.id, act30.id];
    const d14 = new Day({
      accommodation: 'Hotel Skogafoss',
      activities: day14Activities
    });
    days.push(d14);

    // Day 15
    const day15Activities = [act31.id, act32.id];
    const d15 = new Day({
      accommodation: 'Husavik Cape Hotel',
      activities: day15Activities
    });
    days.push(d15);

    // Day 16
    const day16Activities = [act33.id, act34.id];
    const d16 = new Day({
      accommodation: 'CenterHotel Thingholt',
      activities: day16Activities
    });
    days.push(d16);

    // Day 17
    const day17Activities = [act35.id, act36.id];
    const d17 = new Day({
      accommodation: 'Fosshotel Eastfjords',
      activities: day17Activities
    });
    days.push(d17);

    // Day 18
    
    const d18 = new Day({
      accommodation: 'Icelandair Hotel Vik'
    });
    days.push(d18);

    const createdDays = await Day.insertMany(days);

    const itineraries = [];

    // Itinerary 1: Iceland: Nature's Wonders (5 days)
    const itinerary1Days = [d1.id, d2.id, d3.id, d4.id, d5.id];
    const it1 = new Itinerary({
      title: "Iceland: Nature's Wonders",
      locationName: 'Iceland',
      locationType: 'Country',
      countryCode: 'IS',
      lng: -19.02,
      lat: 64.96,
      length: 5,
      author: u2.id,
      days: itinerary1Days
    });
    itineraries.push(it1);

    // Itinerary 2: Iceland Adventure (6 days)
    const itinerary2Days = [d6.id, d7.id, d8.id, d9.id, d10.id, d11.id];
    const it2 = new Itinerary({
      title: 'Iceland Adventure',
      locationName: 'Iceland',
      locationType: 'Country',
      countryCode: 'IS',
      lng: -19.02,
      lat: 64.96,
      length: 6,
      author: u3.id,
      days: itinerary2Days
    });
    itineraries.push(it2);

    // Itinerary 3: Iceland Explorer (7 days)
    const itinerary3Days = [d12.id, d13.id, d14.id, d15.id, d16.id, d17.id, d18.id];
    const it3 = new Itinerary({
      title: 'Iceland Explorer',
      locationName: 'Iceland',
      locationType: 'Country',
      countryCode: 'IS',
      lng: -19.02,
      lat: 64.96,
      length: 7,
      author: u4.id,
      days: itinerary3Days
    });
    itineraries.push(it3);

    const createdItineraries = await Itinerary.insertMany(itineraries);





    console.log("Done!");
  } catch (err) {
    console.error(err.stack);
  }
};
