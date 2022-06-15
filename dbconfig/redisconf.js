const redisClient = redis.createClient();
redisClient.connect();

redisClient.on("error", (err) => console.log("Redis Clinet error", err));
redisClient.on("connect", () => console.log("RedisClient connected."));

module.exports = redisClient;
