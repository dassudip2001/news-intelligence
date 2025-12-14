import app from "./app";
import { initQdrant } from "./config/qdrant-init";

const PORT = process.env.PORT || 5000;
(async () => {
  await initQdrant();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})();
