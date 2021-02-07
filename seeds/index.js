const mongooose = require('mongoose');
const cities = require('./cities.js');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongooose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongooose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60081db3f88a614970aa3ece',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam voluptatem perspiciatis voluptatum molestiae, optio tempora ipsum id, nobis ad ut quam minus? Alias aliquam, nulla explicabo itaque dolorum consectetur. Magnam?',
            price,
            geometry: {
                type : "Point",
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url : "https://res.cloudinary.com/dro9vboft/image/upload/v1611843011/YelpCamp/nvznjfhgble6ycld7ggb.jpg",
                    filename : "YelpCamp/nvznjfhgble6ycld7ggb"
                },
                {
                    url : "https://res.cloudinary.com/dro9vboft/image/upload/v1611843011/YelpCamp/z7mbnjmbvdjvglz2ze9t.jpg",
                    filename : "YelpCamp/z7mbnjmbvdjvglz2ze9t"
                },
                {
                    url : "https://res.cloudinary.com/dro9vboft/image/upload/v1611843012/YelpCamp/ifh1ih0frbznwimvqrau.jpg",
                    filename : "YelpCamp/ifh1ih0frbznwimvqrau"
                }
            ] 
        });
        await camp.save();
    }
}

seedDb().then(() => {
    mongooose.connection.close();
})