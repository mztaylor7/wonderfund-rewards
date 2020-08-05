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

const maxRewards = 6;
const minRewards = 3;

/*
  This is for generating a csv for a db without auto incrementing id column
*/

// var rewardIdCount = 0;
// var projectIdCount = 0;

// rewardIdGen = () => {
//   rewardIdCount++;
//   return rewardIdCount;
// }

// projectIdGen = () => {
//   projectIdCount++;
//   return projectIdCount;
// }

const rewardGenerator = () => ({
  title: faker.commerce.productName(),
  pledgeAmount: Math.floor(faker.finance.amount()),
  description: faker.lorem.paragraph().substring(0, 120),
  deliveryMonth: faker.date.month(),
  deliveryYear: faker.date.future().getFullYear(),
  rewardQuantity: Math.floor(Math.random() * (500 - 1 + 1)) + 1,
  projectId: 0,
  rewardItems: Array.from({ length: random.int(1, 6) }, () =>
    faker.commerce.product()
  ).join(',')
})


const projectGenerator = () => ({
  title: faker.commerce.productName(),
  creator: faker.internet.userName(),
  location: faker.fake('{{address.city}}, {{address.stateAbbr}}')
})

class Writer {

  constructor(file) {
      this.writer = csvWriter();
      this.writer.pipe(fs.createWriteStream(file, { flags: 'a' }));
  }
  write(obj) {
      if(!this.writer.write(obj))
          return new Promise(resolve => this.writer.once('drain', resolve))

      return true;
  }
  end() {
      this.writer.end();
  }
}

(async() => {
  console.time('20M records in');
  const rewardWriter = new Writer('rewards.csv');


  for (let i = 1; i <= 10000000; i++) {
    const randomNumber = Math.floor(Math.random() * (maxRewards - minRewards + 1)) + minRewards;
    for (let j = 1; j <= randomNumber; j++) {
      const newReward = rewardGenerator();
      newReward.projectId = i;
      const res = rewardWriter.write(newReward);
      if(res instanceof Promise) {
        await res;
      }
    }
  }
  rewardWriter.end();
  console.log('reward data generated');
  const projectWriter = new Writer('projects.csv');

  for (let i = 1; i <= 10000000; i++) {

    const res = projectWriter.write(projectGenerator());
    if(res instanceof Promise) {
      await res;
    }
  }

  projectWriter.end();
  console.timeEnd('20M records in');
  console.log('project data generated');
})();