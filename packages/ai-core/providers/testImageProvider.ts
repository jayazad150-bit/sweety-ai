import { generateImage } from "../../../services/image/imageService";

async function main() {

  const result = await generateImage(
    "A futuristic AI assistant with blue glowing eyes"
  );

  console.log(
    JSON.stringify(result, null, 2)
  );

}

main().catch(console.error);
