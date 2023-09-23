import { Model } from "mongoose";

const createCollections = async (models: Model<Document>[]) => {
  await Promise.all(models.map((model) => model.createCollection()));
};

export default createCollections;
