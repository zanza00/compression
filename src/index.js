const zlib = require("zlib");

const idToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiMDgwNzg0NS1kZmEwLTRkYjktODliMy1lMTlmODA4M2JhNjQiLCJleHAiOjE1NzQyNzIzOTcsIm5iZiI6MCwiaWF0IjoxNTc0MjU5NzcwLCJpc3MiOiJodHRwczovL2F1dGgud2F5bmUuY29tL2F1dGgvcmVhbG1zL1dheW5lIiwiYXVkIjoiY2xhcmEtc2Fhcy13ZWJhcHAtYmFja29mZmljZSIsInN1YiI6Ijk0Y2JhZGYwLTg1NjYtNDEwMC04NDEzLWYxNjEzMTI3ODU4ZSIsInR5cCI6IklEIiwiYXpwIjoiY2lhb25lIiwibm9uY2UiOiJYYU42SXctVUxPRVJ4dmJfclF3OXU2Z25RaTVlVGhsRzZEdmFBREhpaTdNIiwiYXV0aF90aW1lIjoxNTc0OTU5NzcwLCJzZXNzaW9uX3N0YXRlIjoiNDMxN2FhOTUtM2U5NC00ZTRjLTllZjctOGIwYWI0ZTg5N2M2IiwiYWNyIjoiMSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImJhdGNhdmUiXX0sIm9yZ2FuaXphdGlvbnMiOltdLCJuYW1lIjoiQnJ1Y2UgV2F5bmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJicnVjZUB3YXluZS5jb20iLCJnaXZlbl9uYW1lIjoiQnJ1Y2UiLCJmYW1pbHlfbmFtZSI6IldheW5lIiwiZW1haWwiOiJicnVjZUB3YXluZS5jb20ifQ.83kxt4DoRc1gzMz1nOsy8-Rcam0PDByRWsCe3q6SVIU";

console.log("===BEGIN ID_TOKEN===");
console.log("token length", idToken.length);

function compressAndDecompress(name, data, compress, decompress) {
  console.log(`---${name}---`);
  const bufferCompress = compress(data);
  const stringCompress = bufferCompress.toString("base64");
  console.log(stringCompress, stringCompress.length);
  const bufferDecompress = decompress(Buffer.from(stringCompress, "base64"));
  const stringDecompress = bufferDecompress.toString("utf-8");
  console.log("after decompress", stringDecompress.length);
}

compressAndDecompress("inflate", idToken, zlib.deflateSync, zlib.inflateSync);
compressAndDecompress(
  "brotli",
  idToken,
  zlib.brotliCompressSync,
  zlib.brotliDecompressSync
);
compressAndDecompress("gzip", idToken, zlib.gzipSync, zlib.gunzipSync);

console.log("===END ID_TOKEN===");

console.log("===BEGIN JSON===");

const extractedData = JSON.stringify({
  acr: "1",
  email_verified: true,
  realm_access_roles: ["offline_access", "uma_authorization", "batcave"],
  organizations: ["BatFamily"],
  name: "Bruce Wayne",
  preferred_username: "Batman",
  given_name: "Bruce",
  family_name: "Wayne",
  email: "bruce@wayne.com"
});

console.log("JSON length", extractedData.length);

compressAndDecompress(
  "inflate",
  extractedData,
  zlib.deflateSync,
  zlib.inflateSync
);
compressAndDecompress(
  "brotli",
  extractedData,
  zlib.brotliCompressSync,
  zlib.brotliDecompressSync
);
compressAndDecompress("gzip", extractedData, zlib.gzipSync, zlib.gunzipSync);
console.log("===END JSON===");
