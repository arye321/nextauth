if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}
let mongoconnect = process.env.MONGODB_URI;
export default mongoconnect;
