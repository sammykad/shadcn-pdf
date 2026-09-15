import { PdfViewer } from "@/components/pdf-viewer";
import { RegistryCommandAnimated } from "@/components/registry-command-animated";
import { Compare } from "@/components/ui/compare";

const workerUrl = "/pdf.worker.min.mjs";
export default async function Home() {

  return (
    <main className="mx-auto max-w-[1100px] px-6 pt-10 pb-20">
      {/* hero */}
      <section className="pt-16 pb-14 text-center">
        <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          PDFs that look like your app.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Shadcn-style components for PDFs, built on @react-pdf/renderer. Copy the
          code, own the document.
        </p>
        <div className="mx-auto mt-8 max-w-lg">
          <RegistryCommandAnimated filter="all" />
        </div>
      </section>


      <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4">
        <Compare
          firstImage="/before-compare.png"
          secondImage="/after-compare.png"
          firstImageClassName="object-contain object-left-top"
          secondImageClassname="object-contain object-left-top"
          className="h-[350px] w-[500px]"
          slideMode="hover"
          autoplay={true}
        />
      </div>
      <PdfViewer source="/salary-slip.pdf" workerSrc={workerUrl} />
    </main>
  );
}
