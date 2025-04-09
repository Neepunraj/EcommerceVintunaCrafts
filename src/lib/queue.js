import Bull from "bull";
import { optimizeSeo } from "./seoOptimisation";
const seoQueue = new Bull("seo-optimization-queue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

seoQueue.process(async (job) => {
  const { title, description, keywords } = job.data;
  await optimizeSeo(title, description, keywords);
});

export const addSeoJob = (title, description, keywords) => {
  return seoQueue.add({
    title,
    description,
    keywords,
  });
};

export default seoQueue;
/* for automation and queueß */
