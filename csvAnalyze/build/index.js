"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchReader_1 = require("./MatchReader");
var Summary_1 = require("./Summary");
var reader = new MatchReader_1.MatchReader("football.csv");
var summary = Summary_1.Summary.winsAnalysisWithHtmlReport("Arsenal");
summary.buildAndPrintReport(reader.read());
