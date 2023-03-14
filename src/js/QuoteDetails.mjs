

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


