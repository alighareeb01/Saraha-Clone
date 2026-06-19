import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
// console.log(process.env.REDIS_URL);

const client = createClient({
  url: "rediss://default:gQAAAAAAAfz1AAIgcDJlYmU3Nzc5ZDQ5NzM0NzI4YjI4M2U3YmM0MDdmYzU2OA@mature-shrew-130293.upstash.io:6379",
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

await client.connect();
console.log("Redis connected");

await client.set("test", "test");

export default client;
