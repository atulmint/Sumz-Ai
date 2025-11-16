import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const ArrayBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([ArrayBuffer]));

  const docs = await loader.load();

  // Juntar páginas
  return docs.map((doc) => doc.pageContent).join("\n");
}
