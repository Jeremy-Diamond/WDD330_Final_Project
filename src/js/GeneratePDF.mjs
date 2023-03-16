import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default class GeneratePDF {
  constructor(canvas) {
    this.canvas = canvas;
    this.PDFTemplate()
  }
  
  PDFTemplate() {
  
    const signatureData = this.canvas.toDataURL("image/png");

    const doc = new jsPDF();
    doc.text("My Document Title", 10, 10);

    // Define the table columns and data
    const columns = ["Name", "Email", "Phone"];
    const data = [
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
      ["John Doe", "john.doe@example.com", "123-456-7890"],
      ["Jane Smith", "jane.smith@example.com", "456-789-1234"],
    ];

    // Set the table column widths
    const columnWidths = [50, 80, 50];
    

    // Draw the table
    doc.autoTable({
      head: [columns],
      body: data,
      startY: 30,
      margin: { top: 20 },
      columnWidth: columnWidths,

      styles: {
        lineColor: [44, 62, 80],
        lineWidth: 1,
      },
      headStyles: {
        fillColor: [241, 196, 15],
        fontSize: 15,
      },
      footStyles: {
        fillColor: [241, 196, 15],
        fontSize: 15,
      },
      bodyStyles: {
        fillColor: [52, 73, 94],
        textColor: 240,
      },
      alternateRowStyles: {
        fillColor: [74, 96, 117],
      },

    });
    
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