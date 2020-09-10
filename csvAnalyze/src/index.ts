import { MatchReader } from "./MatchReader";
import { Summary } from "./Summary";

const reader = new MatchReader("football.csv");

const summary = Summary.winsAnalysisWithHtmlReport("Arsenal");

summary.buildAndPrintReport(reader.read());
