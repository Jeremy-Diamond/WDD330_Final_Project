

export default class QuoteDetails {
    constructor(dataSource, quoteId) {
      this.dataSource = dataSource;
      this.quoteId = quoteId;
      this.workigQuote = {}
    }
    async init() {
        this.workigQuote = await this.dataSource.findOrderById(this.quoteId);
        console.log(this.workigQuote.quote)

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
        

        const quoteLines = this.workigQuote.quote.lineItems
        
        quoteLines.forEach(quoteLine => {
            console.log(quoteLine.name)
        });
        console.log(quoteLines)
  }
  }