import ExternalServices from "./ExternalServices.mjs";
import QuoteDetails from "./QuoteDetails.mjs";

const dataSource = new ExternalServices();

const quoteId = 1

const quoteToDisplay = new QuoteDetails(dataSource, quoteId);
quoteToDisplay.init();
