const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send();
})

//Delete Posts
router.delete('/:id', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://jack12:jack12@ds155213.mlab.com:55213/vue_express_sean',
    {
      useNewUrlParser: true
    }
  );
  return client.db('vue_express_sean').collection('posts');
}

module.exports = router;
