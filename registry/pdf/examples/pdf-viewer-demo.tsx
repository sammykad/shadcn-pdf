import { PdfViewer } from "@/components/pdf-viewer";

export default function PdfViewerDemo() {
  return (
    <PdfViewer
      source="/sample.pdf"
      className="w-full"
      maxHeight="30rem"
    />
  );
}
