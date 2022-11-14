import {createClient} from 'redis';

const store = createClient({
  url: process.env.REDIS_URL
});

export default store;
//A4abjy5t6c1km25dsca15vnwlbxukexrqn8lgemltb46ikn6gcx;
