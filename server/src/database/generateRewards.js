const faker = require('faker');
const random = require('random');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const getDaysBetween = (date1, date2) => {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const rewardGenerator = () => ({
  title: faker.commerce.productName(),
  pledgeAmount: Math.floor(faker.finance.amount()),
  description: faker.lorem.paragraph().substring(0, 120),
  deliveryMonth: faker.date.month(),
  deliveryYear: faker.date.future().getFullYear(),
  shippingType: faker.company.bsAdjective(),
  rewardQuantity: Math.floor(Math.random() * (500 - 1 + 1)) + 1,
  timeLimit: faker.random.number(),
  projectId: faker.random.number(),
  rewardItems: Array.from({ length: random.int(1, 6) }, () =>
    faker.commerce.product()
  ).join(',')
})


const projectGenerator = () => ({
  title: faker.commerce.productName(),
  creator: faker.internet.userName(),
  subtitle: faker.company.catchPhrase(),
  category: faker.commerce.department(),
  subcategory: faker.commerce.productAdjective(),
  location: faker.fake('{{address.city}}, {{address.stateAbbr}}'),
  heroImage: faker.image.image(),
  heroVideo: 'https://ytroulette.com/',
  launchDate: faker.date.future().toString(),
  campaignDuration: getDaysBetween(new Date(), faker.date.future()),
  budget: Math.floor(faker.finance.amount()),
  fundingGoal: Math.floor(faker.finance.amount())
})

// const writeRewards = () => {
//   writer.pipe(fs.createWriteStream('rewards.csv'));
//   for (var i = 0; i < 10000000; i++) {
//     writer.write(rewardGenerator())
//   }
//   console.log('data generated for rewards');
// }

var i = 10000000;

const writeProjects = () => {
  writer.pipe(fs.createWriteStream('projects.csv'));
  for (i ; i > 0; i--) {
    if (!writer.write(projectGenerator())) {
      writer.once('drain', writeProjects)
    } else {
      writer.write(projectGenerator())
    }
  }

  writer.end();
  console.log('data generated');
}


// writeRewards();
writeProjects();


// class Writer {

//   constructor(file) {
//       this.writer = csvWriter();
//       this.writer.pipe(fs.createWriteStream(file, { flags: 'a' }));
//   }

//   write(obj) {
//       // if .write returns false we have to wait until `drain` is emitted
//       if(!this.writer.write(obj))
//           return new Promise(resolve => this.writer.once('drain', resolve))

//       return true;
//   }

//   end() {
//       // Wrap it in a promise if you wish to wait for the callback.
//       this.writer.end();
//   }

// }

// (async() => {
//   const rewardWriter = new Writer('rewards.csv');

//   for (let i = 0; i < 10000000; i++) {
//     for(let i = 0; i < 1e8; i++) {
//         const res = rewardWriter.write(rewardGenerator());
//         if(res instanceof Promise) {
//             // You can remove this if, and leave just: await writer.write...
//             // but the code will be slower
//             await res; // This will wait for the stream to emit the drain event
//         }
//     }
//   }
//   rewardWriter.end();
//   console.log('data generated');
  // const projectWriter = new Writer('projects.csv');

  // for (let i = 0; i < 10000000; i++) {
  //   for(let i = 0; i < 1e8; i++) {
  //       const res = projectWriter.write(projectGenerator());
  //       if(res instanceof Promise) {
  //           // You can remove this if, and leave just: await writer.write...
  //           // but the code will be slower
  //           await res; // This will wait for the stream to emit the drain event
  //       }
  //   }
  // }

  // projectWriter.end();

// })();