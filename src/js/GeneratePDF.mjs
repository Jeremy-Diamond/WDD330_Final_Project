import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default class GeneratePDF {
  constructor(canvas, tableData,quoteDetails) {
    this.canvas = canvas;
    this.quoteDetails = quoteDetails
    this.tableData = tableData
    this.PDFTemplate()
  }
  
  PDFTemplate() {
  
    const signatureData = this.canvas.toDataURL("image/png");

    const doc = new jsPDF();
    console.log(this.quoteDetails)
    doc.text(`Quote Number: ${this.quoteDetails.quote.quoteNumber}`, 130, 20);
    doc.text(`Customer #: ${this.quoteDetails.quote.customerNumber}`, 130, 28);
    doc.text(`Sales Rep: ${this.quoteDetails.quote.salesRep.name}`, 130, 36);

    doc.addImage("https://lesolson.com/wp-content/uploads/2021/10/BLKREDlogo.png", "PNG", 10, 10, 80, 20);
    
    doc.addImage(window.location.href, "JPEG", 0, 0, 210, 297);

    // Define the table columns and data
    const columns = ["Item", "Description", "Qty", "Price"];
    //const data = [["BP-50C31","john.doe@example.com","123-456-7890"],["BP-DE12","john.doe@example.com","123-456-7890"],["BP-FN11","john.doe@example.com","123-456-7890"],["Sharp 90 Day Warranty","john.doe@example.com","123-456-7890"],["Atlas/Titan Startup Bundle NASPO","john.doe@example.com","123-456-7890"],["BP-NT70BA","john.doe@example.com","123-456-7890"],["BP-NT70CA","john.doe@example.com","123-456-7890"],["BP-NT70MA","john.doe@example.com","123-456-7890"],["BP-NT70YA","john.doe@example.com","123-456-7890"],["SURGE-15","john.doe@example.com","123-456-7890"],["ITOM","john.doe@example.com","123-456-7890"],["Existing Equipment","john.doe@example.com","123-456-7890"],["Existing Equipment","john.doe@example.com","123-456-7890"]]

    /* Import table straight from page
    html2canvas(document.querySelector('table')).then(function (canvas) {
      // add the captured image to the PDF
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 180, 180);
      // save the PDF
      doc.save('pdf-table.pdf');
    });

    */


    // Set the table column widths
    const columnWidths = [50, 80, 50];
    
    // Draw the table
    doc.autoTable({
      head: [columns],
      body: this.tableData,
      startY: 40,
      margin: { top: 20 },
      columnWidth: columnWidths,

      styles: {
        lineColor: [207,31,55],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [51,51,51],
        fontSize: 15,
      },
      footStyles: {
        fillColor: [241, 196, 15],
        fontSize: 15,
      },
      bodyStyles: {
        fillColor: [225, 225, 225],
        textColor: [51,51,51],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
        textColor: [51,51,51],
      },

    });

    //Insert Total and Signer details
    doc.text(`Quote Total: $${this.quoteDetails.quote.quoteTotal.toFixed(2)}`, 100, doc.lastAutoTable.finalY + 20);
    doc.text("Signer Name: Jeremy Diamond", 100, doc.lastAutoTable.finalY + 28);
    doc.text("Signer Title: Owner" , 100, doc.lastAutoTable.finalY + 36);
    doc.text("Signer Email: socjeremyd@gmail.com", 100, doc.lastAutoTable.finalY + 43);

    
    // Insert the signature image
    const imgWidth = 80;
    const imgHeight = (this.canvas.height * imgWidth) / this.canvas.width;
    doc.addImage(signatureData, "PNG", 10,  doc.lastAutoTable.finalY + 10, imgWidth, imgHeight);
    
    doc.addImage(window.location.href, "JPEG", 0, 0, 210, 297);
    doc.autoPrint();
    // Save the PDF file
    doc.save("my-document.pdf");
  }
  
}


/*
LOOP SAMPLE

// Import jsPDF and jspdf-autotable libraries
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Get the HTML table element
const table = document.getElementById('my-table');

// Convert the table to an array of rows and columns
const rows = [];
const headers = [];
for (let i = 0; i < table.rows.length; i++) {
  const row = [];
  for (let j = 0; j < table.rows[i].cells.length; j++) {
    if (i === 0) {
      headers.push(table.rows[i].cells[j].innerText);
    }
    row.push(table.rows[i].cells[j].innerText);
  }
  rows.push(row);
}

// Create a new jsPDF instance
const doc = new jsPDF();

// Add the table using jspdf-autotable
doc.autoTable({
  head: [headers],
  body: rows,
});

// Save the PDF document
doc.save('table.pdf');

*/