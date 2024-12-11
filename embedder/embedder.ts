import { FeatureExtractionPipeline, pipeline } from "@huggingface/transformers";

export class Embedder {
  private static model = "Xenova/all-MiniLM-L6-v2";
  private static embedder?: FeatureExtractionPipeline;

  static async get() {
    if (!Embedder.embedder) {
      Embedder.embedder = await pipeline("feature-extraction", Embedder.model, {
        progress_callback: (r) => console.log(r.progress),
      });
    }

    return Embedder.embedder;
  }

  static async embed(input: string[]) {
    const embedder = await Embedder.get();
    const tensor = await embedder(input, { pooling: "mean", normalize: true });
    return tensor.tolist();
  }
}
