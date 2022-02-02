const {PDFDocument, StandardFonts, rgb} = PDFLib

async function createPdf() {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create()
  var myUploadedFile = document.getElementById("myFile").files[0];
  const existingPdfBytes = await myUploadedFile.arrayBuffer()

  document.getElementById("button").innerText = "Creating PDF! (This might take a minute)"
  const [uploadedPdfDoc] = await pdfDoc.embedPdf(existingPdfBytes);

  const pages = document.getElementById("numPages").value
  for (let i = 0; i < pages; i++) {
    const page = pdfDoc.addPage();
    page.drawPage(uploadedPdfDoc)
  }

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  document.getElementById("button").innerText = "PDF Created! Downloading!"

  // Trigger the browser to download the PDF document
  download(pdfBytes, "rm-pdf-template.pdf", "application/pdf");
}

document.getElementById("button").onclick = () => createPdf()
