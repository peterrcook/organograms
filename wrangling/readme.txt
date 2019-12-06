Data is from: https://www.instituteforgovernment.org.uk/blog/hacking-organograms-unlocking-government-data

CSVs are saved by hand from Libre Office Calc.

It'd be nice to have a script to do this, but I haven't tried and tested a suitable node or Python lib that imports .xslx files.

(I've tried Pandas' read_excel and it was really slow. I couldn't get excel from npm working. I also tried converting to .ods and using pandas-ods-reader but it crashed.)
