const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generateUserPDF = (user) => {
  const pdfDir = path.join(__dirname, "../pdfs");
  const outputPath = path.join(pdfDir, `${user.username}.pdf`);


  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.fontSize(20).text("User Profile Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Username : ${user.username}`);
  doc.text(`Email : ${user.email}`);
  doc.text(`Full Name : ${user.fullName}`);
  doc.text(`Source Profile : ${user.sourceProfile}`);

  doc.end();

  console.log("PDF generated at :", outputPath);
};
