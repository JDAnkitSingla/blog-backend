import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

/**
 * Make the app use the parsor to parse json request body
 */
app.use(bodyParser.json());

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlPArser: true,
    });
    const db = client.db('my-blog');

    operations(db);

    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connection to db', error });
  }
};
/**
 * Basic Get request
 */
app.get('/hello', (req, res) => {
  res.send('Hello !!');
});

/**
 * Basic Get request with path param
 */
app.get('/hello/:name', (req, res) => {
  res.send(`Hello ${req.params.name}!!`);
});

/**
 * Basic Post Request
 */
app.post('/hello', (req, res) => {
  res.send(`Hello ${req.body.name} !!! from Post.`);
});

/**
 * Get an article
 */
app.get('/api/articles/:name', async (req, res) => {
  withDB(async (db) => {
    const arcticleName = req.params.name;

    const articleInfo = await db
      .collection('articles')
      .findOne({ name: arcticleName });

    res.status(200).json(articleInfo);
  }, res);
});

/**
 * Upvote an article
 */
app.post('/api/articles/:name/upvote', async (req, res) => {
  withDB(async (db) => {
    const arcticleName = req.params.name;

    const articleInfo = await db
      .collection('articles')
      .findOne({ name: arcticleName });

    await db.collections('articles').updateOne(
      { name: arcticleName },
      {
        $set: {
          upvotes: articleInfo.upvotes + 1,
        },
      }
    );

    const articleInfoUpdated = await db
      .collection('articles')
      .findOne({ name: arcticleName });

    res.status(200).json(articleInfoUpdated);
  }, res);
});

/**
 * Add comment
 */
app.post('/api/articles/:name/add-comment', async (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    const article = await db
      .collection('articles')
      .findOne({ name: articleName });

    await db.collection('articles').updateOne(
      { name: articleName },
      {
        $set: {
          comments: article.comments.concat({
            username: username,
            text: text,
          }),
        },
      }
    );

    const articleUpdated = await db
      .collection('articles')
      .findOne({ name: articleName });
      
    res.status(200).json(articleUpdated);

  }, res);
});

/**
 * Start Server app
 */
app.listen('8000', () => {
  console.log('Listening on port 8000');
});
