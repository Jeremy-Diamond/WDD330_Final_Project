import SignaturePad from "signature_pad";
import jsPDF from "jspdf";


export default class QuoteDetails {
    constructor(dataSource, quoteId) {
      this.dataSource = dataSource;
      this.quoteId = quoteId;
      this.workigQuote = {}
      this.quoteLines = {}
      this.quoteLineGroups = {}
      this.groupcounter = 1
    }
    async init() {
      this.workigQuote = await this.dataSource.findOrderById(this.quoteId);
      console.log(this.workigQuote.quote)
      this.quoteLines = this.workigQuote.quote.lineItems
      console.log(this.quoteLines)
      this.quoteLineGroups = this.workigQuote.quote.lineItemGroups
      console.log(this.quoteLineGroups)

      //Set quote information 
      document.querySelector("#sales-order-number").innerHTML = this.workigQuote.quote.quoteNumber
      document.querySelector("#customer-number").innerHTML = this.workigQuote.quote.customerNumber
      document.querySelector("#sales-rep").innerHTML = this.workigQuote.quote.salesRep.name
      document.querySelector("#quote-expiration-date").innerHTML = this.workigQuote.quote.quoteExpirationDate
      
      // set sold to information
      document.querySelector("#address-name").innerHTML = this.workigQuote.quote.soldTo.name
      document.querySelector("#address-street").innerHTML = this.workigQuote.quote.soldTo.street
      document.querySelector("#address-city").innerHTML = this.workigQuote.quote.soldTo.city
      document.querySelector("#address-state").innerHTML = this.workigQuote.quote.soldTo.state
      document.querySelector("#address-zip").innerHTML = this.workigQuote.quote.soldTo.zipCode

      //Set Contact Information
      document.querySelector("#contact-name").innerHTML = this.workigQuote.quote.primaryContact.name
      document.querySelector("#contact-email").innerHTML = this.workigQuote.quote.primaryContact.email
      document.querySelector("#contact-phone").innerHTML = this.workigQuote.quote.primaryContact.phone
      
      //Create Groups


        this.quoteLineGroups.forEach(group => {
          
          const newGroup = document.createElement("div")
          newGroup.innerHTML = this.groupTemplate(group)
          document.querySelector(".group-container").appendChild(newGroup)
          this.groupcounter += 1
        });


        
        this.quoteLines.forEach(quoteLine => {
            console.log(quoteLine.name)
        });
        console.log(this.quoteLines)

        this.addSignaturePad()
  }

  addSignaturePad(){

    //initializs pad

    const canvas = document.getElementById("signature-pad");
    const signaturePad = new SignaturePad(canvas);
    
    const clearButton = document.getElementById("clear-button");
    clearButton.addEventListener("click", function() {
      signaturePad.clear();
    });
   
  
    const signiturePDF = document.getElementById("generate-pdf-button");
    signiturePDF.addEventListener("click", function() {

    const signatureData = canvas.toDataURL("image/png");

    const doc = new jsPDF();
    doc.text("My Document Title", 10, 10);

    // Define the table columns and data
const columns = ["Name", "Email", "Phone"];
const data = [
  ["John Doe", "john.doe@example.com", "123-456-7890"],
  ["Jane Smith", "jane.smith@example.com", "456-789-1234"]
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
});

    // Insert the signature image
    const imgWidth = 80;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    doc.addImage(signatureData, "PNG", 10, 20, imgWidth, imgHeight);

    // Save the PDF file
    doc.save("my-document.pdf");

    });



  }

  groupTemplate(group){
    return`
    <div class="group-drawer">
    <input class="group-drawer__trigger" id="group-drawer-${this.groupcounter}" type="checkbox" /><label class="group-drawer__title" for="group-drawer-${this.groupcounter}">${group.name} </label>
    <div class="group-drawer__content-wrapper">
      <div class="group-drawer__content">
        ${this.createGroupTable(group)}
      </div>
    </div>
  </div>`
  }

  createGroupTable(group){

    const tableContent = document.createElement("div")

    const groupTable = document.createElement("table")
    groupTable.classList.add("qlg-table")

    const groupTableHead = document.createElement("thead")
    groupTableHead.classList.add("qlg-table-head")

    groupTableHead.innerHTML = `
    <tr class="ql-header-row">
      <td>Item</td>
      <td>Description</td>
      <td>Qty</td>
      <td>Price</td>
    </tr>
    `

    groupTable.appendChild(groupTableHead)

    const groupTableBody = document.createElement("tbody")

    this.quoteLines.forEach(quoteLine => {
      if (quoteLine.groupId === group.id) {
        const qlRow = document.createElement("tr")
        qlRow.innerHTML = `
        <td>${quoteLine.productCode}</td>
        <td 
            <div>${quoteLine.description}</div>
            
        </td>
        <td>${quoteLine.quantity}</td>
        <td>$${quoteLine.salesPrice}</td>
        `

        groupTableBody.appendChild(qlRow)
      }
    });
    
    groupTable.appendChild(groupTableBody)

    tableContent.appendChild(groupTable)
    
    return tableContent.innerHTML
  }
  }


