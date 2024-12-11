import { Buffer } from "node:buffer";
import { customType } from "drizzle-orm/sqlite-core";

export const f32Blob = customType<{
  data: number[];
  config: {
    length: number;
  };
  configRequired: true;
}>({
  dataType(conf) {
    return `F32_BLOB(${conf.length})`;
  },
  fromDriver(value: unknown) {
    const fArr = new Float32Array(new Uint8Array(value as Buffer).buffer);
    return Array.from(fArr);
  },
  toDriver(value) {
    return Buffer.from(new Float32Array(value).buffer);
  },
});
