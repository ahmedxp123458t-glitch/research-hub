const { connectDB } = require('./config/db');
const ResearchGroup = require('./models/ResearchGroup');
const Document = require('./models/Document');
const Discussion = require('./models/Discussion');
const Progress = require('./models/Progress');
const Citation = require('./models/Citation');

const seed = async () => {
  await connectDB();

  await ResearchGroup.deleteMany({});
  await Document.deleteMany({});
  await Discussion.deleteMany({});
  await Progress.deleteMany({});
  await Citation.deleteMany({});

  const group = await ResearchGroup.create({ name: 'AI Lab', description: 'Artificial intelligence research group', members: ['Alice', 'Bob'] });

  await Document.create({ groupId: group._id, title: 'Research Paper Draft', fileUrl: '/papers/draft.pdf', uploadedBy: 'Alice' });

  await Discussion.create({ groupId: group._id, userId: 'Bob', message: 'Check the latest paper draft' });

  await Progress.create({ groupId: group._id, milestone: 'Literature Review', percentage: 100 });
  await Progress.create({ groupId: group._id, milestone: 'Data Collection', percentage: 60 });

  await Citation.create({ title: 'Deep Learning', author: 'Goodfellow', year: 2016, journal: 'MIT Press', doi: '10.1234/dl' });

  console.log('Seed complete');
  process.exit(0);
};

seed();
