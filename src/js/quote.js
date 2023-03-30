import ExternalServices from "./ExternalServices.mjs";
import QuoteDetails from "./QuoteDetails.mjs";
import { getParam } from "./utils.mjs";

const dataSource = new ExternalServices();



const quoteId = getParam("id")
//console.log(quoteId)

const quoteToDisplay = new QuoteDetails(dataSource, quoteId);
quoteToDisplay.init();
