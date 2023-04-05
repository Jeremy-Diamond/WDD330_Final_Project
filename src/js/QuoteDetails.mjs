import SignaturePad from "signature_pad";
import GeneratePDF from "./GeneratePDF.mjs";


export default class QuoteDetails {
    constructor(dataSource, quoteId) {
      this.dataSource = dataSource;
      this.quoteId = quoteId;
      this.workigQuote = {}
      this.quoteLines = {}
      this.quoteLineGroups = {}
      this.groupcounter = 1
      this.pdfGroups = []
    }
    async init() {
      this.workigQuote = await this.dataSource.findOrderById(this.quoteId);
      //console.log(this.workigQuote.quote)
      this.quoteLines = this.workigQuote.quote.lineItems
      //console.log(this.quoteLines)
      this.quoteLineGroups = this.workigQuote.quote.lineItemGroups
      //console.log(this.quoteLineGroups)

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
          const pdfLine = [quoteLine.productCode, quoteLine.description, quoteLine.quantity, quoteLine.salesPrice]; 
          this.pdfGroups.push(pdfLine)
            //console.log(quoteLine.name)
        });
        //console.log(this.quoteLines)
        this.addSignaturePad(this.pdfGroups)
        //console.log(this.pdfGroups)

        const termsLink = document.querySelector("#terms-link"); // get link element
        
        termsLink.addEventListener("click", (event) => {

          /*

          In regular functions, the this keyword refers to the object that called the function, or the object that the function belongs to. However, in an arrow function, this refers to the context in which the function was defined, rather than the context in which it is called.

          In your code, the addEventListener() method is called on the termsLink element, and the showTermsModal() method is invoked within the event listener function. Because the event listener function is a regular function, the this keyword refers to the termsLink element, rather than the object that the method belongs to.

          By changing showTermsModal() to an arrow function, the this keyword now refers to the object that the method belongs to, which is the class instance. This allows the method to access other properties and methods of the class.

          */
          event.preventDefault(); // prevent link from opening in new page
          this.showTermsModal(); // call showTermsModal() method on modal instance
        });


  }

  showTermsModal() {
    // Get the modal window and modal content divs
    var modalWindow = document.querySelector(".modal-window");
    var modalContent = document.querySelector(".modal-content");
  
    // Load the terms and conditions into the modal content div
    modalContent.innerHTML = `<h2>GENERAL TERMS AND CONDITIONS</h2>
    <p>(1) This Agreement by and between Customer/Lessor (collectively "Customer") and Les Olson Company ("LOC"), including the Maintenance Agreement (if applicable and defined below), shall be legally considered agreed and valid upon signature by the Customer.</P>
    <p>(2) This Agreement may not be assigned or transferred by the Customer without the written approval of an LOC Officer.</P>
    <p>(3) This Agreement constitutes the entire Agreement for this transaction between the Customer and LOC. The provisions herein shall be deemed to accurately represent the intent of both parties. No term or condition, express or implied, is authorized unless it appears on the original of this Agreement. This Agreement may not be varied or modified, except in writing and signed by an LOC Officer and the Customer.</P>
    <p>(4) For products/software and/or services acquired under this Agreement, the terms of payment are net thirty (30) days. Time is of the essence regarding the terms of this contract, and if default be made by the Customer in any payment of any of the terms of this sale, a finance charge of one and a half (1.5) percent per month (annual percentage rate of eighteen (18) percent) will be charged on any overdue account. LOC agrees to provide reasonable assistance to Customer in its efforts to finance the purchase or lease of the product/software and/or services; however, Customer acknowledges such financing is not and cannot be guaranteed by LOC. Customer shall be ultimately responsible for payment of the purchase price of products/software and/or services sold or leased. A 15% handling charge on all returned merchandise will be made.</P>
    <p>(5) If Customer's account becomes delinquent and is turned over to an attorney or third-party collector, the Customer agrees to pay fees equal to the total balance due plus all of LOC's related fees, attorney fees, and collection costs, even if no suit or action is filed.</P>
    <p>(6) This Agreement does not include applicable taxes. All taxes levied or imposed, now or hereafter, by any governmental authority are the Customer's sole responsibility and shall be timely paid by the Customer</P>
    <p>(7) Title to all products/software acquired under this Agreement shall remain with LOC until the full purchase price is paid. Customer shall be responsible for any loss, damage or injury to all products/software acquired under this Agreement, whether by acts of nature or otherwise, and no such loss, damage or injury shall relieve the Customer from liability to pay the full purchase price.</P>
    <p>(8) If products/software and/or services are delivered to Customer before final payment, the Customer gives LOC the right to file financing statements with respect to the equipment under the Uniform Commercial Code, as amended, or other similar provisions of law, and authorizes LOC where permitted by law to make such fillings without buyer's signature.</P>
    <p>(9) In the event that a manufacturer's software is required in conjunction with this sale, Customer is responsible to perform and complete applicable system backups prior to such installation. LOC shall not be liable for loss or damage of any kind to data or equipment as a result of this installation. End-User License Agreements ("EULA") govern the use and distribution of manufacturer's software. Customer shall be solely responsible for the cost of any cables, electrical requirements or additional hardware required to connect equipment to a network. LOC shall not be responsible for any updates or problems arising after the initial installation due to a change in the Customer's computers and/or network.</P>
    <p>(10) Customer is responsible for the protection and removal of sensitive and private data that may become stored on Customer's equipment. While LOC may provide options for data removal and protection, Customer is solely responsible for selecting an appropriate data removal standard that meets Customer's business needs. LOC does not recommend any particular option, and LOC is not liable for damages arising from Customer's failure to remove and protect its data fully. Regardless of which standard Customer chooses, Customer must return leased equipment in full working order at the end of any lease term.</P>
    <p>(11) Standard Image and Print Product Limited Warranty: LOC warrants new and used equipment to be free of defect in materials and workmanship for a period of ninety (90) days from installation. This warranty does not extend to the replacement of supply items or consumables, including, but not limited to, photoconductors, heat rollers, fuser, cleaning kits, toner, developer, paper or staples. Under no circumstances will LOC be responsible for any consequential or incidental damages.</P>
    <p>(12) This Agreement shall be construed in accordance with the laws of the State of Utah.</P>
    <p>(13) LOC's failure to enforce any term of this Agreement shall not be deemed a waiver thereof</P>
    <p>(14) Limit of Liability. Except as expressly provided in these Conditions, Les Olson Company shall not be liable for damage to property or for injury to any person arising from the sale, installation, use or removal of products unless caused by the sole neglect of Les Olson Company. Each party hereby agrees to indemnify and hold the other party harmless from and against any and all claims, demands, actions, losses, liabilities, costs and expenses (including reasonable attorney's fees) arising out of or resulting from the performance, or lack of performance, of each party's activities under this Agreement except to the extent caused by either party's sole negligence or willful misconduct.</P>
    <h2>IMAGE AND PRINT PRODUCTS MAINTENANCE AGREEMENT TERMS AND CONDITIONS</h2>
    <p>(1) This Maintenance Agreement (the "Maintenance Agreement") covers only the product(s) described on the face hereof and does not include any product(s) or accessories not listed. All parts and labor for adjustments and repairs as necessitated by normal use of the products(s) described on the face hereof are determined by LOC. Not included in this Maintenance Agreement are network/software support, LOC IT Connectivity Services ("LOCITCS"), and consumable supplies such as, but not limited to, paper and staples. LOCITCS is an optional service and can be added to this Agreement at an additional charge</P>
    <p>(2) Optional LOCITCS solely provide connectivity coverage for printing services related to the connectivity between the covered product/service and Customer's network. LOCITICS cover phone support and onsite service for print driver installation, PC faxing, inbound routing, and scanning to email, folders, or desktop. LOCITCS do not provide coverage or services for Customer's network itself; issues outside of the LOC-provided products/software (such as network failure, routers, etc.) are not covered under LOCITCS and any service provided related thereto (if available) will be rendered at established service rates in effect at the time such service is performed. MFP Devices which utilize scanning technology may be billed separately for scans</P>
    <p>(3) Customer agrees to pay LOC the base and overage charges listed on this Maintenance Agreement and agrees that excess images over the allotted base amount during the billing cycle will be billed to Customer at the agreed upon rate for excess images. If not noted, excess images will be charged at LOC's retail rates. Customer agrees that LOC may increase the per image rate annually during any term of the Maintenance Agreement by an amount not to exceed ten (10) percent of such charge.</P>
    <p>(4) Maintenance Agreement charges are payable in advance. Monthly and quarterly plans are available based on volume usage, but minimum monthly volumes are required. LOC also reserves the right to adjust pricing at any time during the Agreement in response to image coverage above 7% for mono images and 30% for color images. If toner is included in the Agreement, the toner will be supplied within the cost per image rate based upon the standard manufacturer's yield. Excess toner will be billed at standard manufacturer's yield.</P>
    <p>(5) Meter collection may be necessary to ensure accurate billing. If a meter cannot be collected, the monthly minimum will be billed. Customer acceptance of manufacturer software installation on Customer's computers/network may entitle Customer to a reduced cost per image rate on the products acquired under this Maintenance Agreement. If product(s) require(s) manual meter collection, a 10% increase on quoted cost per image rates may take effect.</P>
    <p>(6) If this Maintenance Agreement is in place during the term of the Agreement, LOC will provide new or equivalent replacement parts that have been worn or broken through normal use. Parts requiring replacement due to irregular use or accident shall be billed to Customer at LOC's published part prices in effect at the time such part is sold. Irregular use or accident is constituted by but not limited to: service or repairs made necessary by accident, misuse, abuse, neglect, theft, riot, vandalism, electrical power failure, fire, flood, lightning, other acts of nature, or as a result of either service by unauthorized personnel or use of supplies or parts that do not meet manufacturer's published supply or part specifications for the equipment; these aforementioned conditions may render this Maintenance Agreement invalid. Service or repairs needed due to damage sustained during a move of a device, unless performed by an authorized LOC representative, shall not be covered by this Maintenance Agreement in place and shall be subject to additional charges. When service work beyond normal use is required, LOC will submit a cost estimate for such service work. If the Customer authorizes such service work, a separate invoice will be rendered.</P>
    <p>(7) Machine environmental location must follow manufacturer specifications.</P>
    <p>(8) All service calls, including those for recommended preventative maintenance ("PM"), shall be made upon request by the Customer. It is the responsibility of the Customer to schedule PM service calls and the responsibility of LOC to provide the recommended preventative maintenance. PMs may be in conjunction with regular or emergency service calls. Service work furnished to Customer may include reasonable use of Customer's image allotments and materials.</P>
    <p>(9) LOC's standard business hours are 8:00 a.m. to 5:00 p.m., Monday through Friday, excluding LOC observed holidays. LOC shall make all service calls, including PMs, covered under this Maintenance Agreement during standard business hours.</P>
    <p>(10) Mileage may be charged for locations more than 50 miles from any LOC facility if a Maintenance Agreement is or is not in effect during the term of this Agreement</P>
    <p>(11) The Maintenance Agreement, if purchased, shall continue for the term stated on the Agreement. The Maintenance Agreement shall automatically renew for successive one (1) year terms unless either party provides written notice to the other party of their intent to terminate prior to thirty (30) days before the expiration of the original term or any subsequent renewal terms. Written notice must be sent to:</P>
    <p>Les Olson Company</P>
    <p>c/o Contract Renewals</P>
    <p>3244 South 300 West</P>
    <p>Salt Lake City, UT 84115</P>
    <p>(12) Customer's failure to abide by all payment obligations may result in delay/suspension of service or termination of this Maintenance Agreement and may, at LOC's sole discretion, constitute a default under this Maintenance Agreement and the Agreement.</P>`

    const closeButton = document.createElement("button");
      closeButton.innerHTML = "Close";
      closeButton.classList.add("close-button")
      closeButton.addEventListener("click", () => {
        modalWindow.style.display = "none";
      });

      modalContent.appendChild(closeButton);
  
    // Show the modal window
    modalWindow.style.display = "block";
  }

  addSignaturePad(groups){

    //initializs pad

    const canvas = document.getElementById("signature-pad");
    const signaturePad = new SignaturePad(canvas);
    
    const clearButton = document.getElementById("clear-button");
    clearButton.addEventListener("click", function() {
      signaturePad.clear();
    });
    const form = document.querySelector("form");
const requiredFields = form.querySelectorAll("[required]");
    const signaturePDF = document.getElementById("generate-pdf-button");
    signaturePDF.addEventListener("click", function(event) {
      if (signaturePad.isEmpty()) {
        // If signature pad is empty, prevent form submission and show an error message
        event.preventDefault();
        alert("Please provide a signature.");
      } else {

        let hasEmptyField = false;

  requiredFields.forEach(function(field) {
    if (field.value.trim() === "") {
      event.preventDefault();
      hasEmptyField = true;
    }
  });

  if (hasEmptyField) {
    event.preventDefault();
    alert("Please fill out all required fields.");
  } else {
    // All required fields have been filled out 
    event.preventDefault();   
    new GeneratePDF(canvas, groups);
  }
      }
    });



  }

  groupTemplate(group){
    return`
    <div class="group-drawer">
    <input class="group-drawer__trigger" id="group-drawer-${this.groupcounter}" type="checkbox" /><label class="group-drawer__title" for="group-drawer-${this.groupcounter}">${group.name}  (Subtotal: $${group.subtotal.toFixed(2)}) </label>
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