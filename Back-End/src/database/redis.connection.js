import { createClient } from "redis";

const client = createClient({
  url: "rediss://default:gQAAAAAAAScBAAIncDIxOTMzNmZmNjA4NjA0MzIwYWEwMmNkNjc0OThjZDJiNnAyNzU1MjE@first-boxer-75521.upstash.io:6379",
});

client.on("error", function (err) {
  throw err;
});
await client.connect();
await client.set("foo", "bar");

export default client;
