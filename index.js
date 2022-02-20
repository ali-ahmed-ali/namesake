const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const send_email = require('./send_email');
//class for the data that we want to save on "Change of Name(s)" pdf
let  ChangeOfName = class{
    constructor(division, petitionerFName, petitionerMName, petitionerLName, streetAddress, city, state, zip, petitionerDOB, petitionerPlaceOfBirth,  spouseFName,
        spouseMName, spouseLName, spouseDOB, spousePlaceOfBirth, minorChildrenNames, reasonForChange, partiesChangedNamesBefore, explain, 
        petitionerOldFName, petitionerOldMName,petitionerOldLName,petitionerNewFName,petitionerNewMName,petitionerNewLName,
        spouserOldFName, spouseOldMName,spouseOldLName,spouseNewFName,spouseNewMName,spouseNewLName,
        child1OldFName, child1OldMName,child1OldLName,child1NewFName,child1NewMName,child1NewLName,
        child2OldFName, child2OldMName,child2OldLName,child2NewFName,child2NewMName,child2NewLName,
        child3OldFName, child3OldMName,child3OldLName,child3NewFName,child3NewMName,child3NewLName,
        dateOfChange ,DECREEDate) {
            this.division = division;

            this.petitionerFName = petitionerFName;
            this.petitionerMName = petitionerMName;
            this.petitionerLName = petitionerLName;

            this.streetAddress = streetAddress;
            this.city = city;
            this.state = state;
            this.zip = zip;

            this.petitionerDOB = petitionerDOB;
            this.petitionerPlaceOfBirth = petitionerPlaceOfBirth;

            this.spouseFName = spouseFName;
            this.spouseMName = spouseMName;
            this.spouseLName = spouseLName;

            this.spouseDOB = spouseDOB;
            this.spousePlaceOfBirth = spousePlaceOfBirth;

            this.minorChildrenNames = minorChildrenNames;

            this.reasonForChange = reasonForChange;

            this.partiesChangedNamesBefore = partiesChangedNamesBefore;

            this.explain = explain;

            this.petitionerOldFName = petitionerOldFName;
            this.petitionerOldMName = petitionerOldMName;
            this.petitionerOldLName = petitionerOldLName;
            this.petitionerNewFName = petitionerNewFName;
            this.petitionerNewMName = petitionerNewMName;
            this.petitionerNewLName = petitionerNewLName;

            this.spouserOldFName = spouserOldFName;
            this.spouseOldMName = spouseOldMName;
            this.spouseOldLName = spouseOldLName;
            this.spouseNewFName = spouseNewFName;
            this.spouseNewMName = spouseNewMName;
            this.spouseNewLName = spouseNewLName;

            this.child1OldFName = child1OldFName;
            this.child1OldMName = child1OldMName;
            this.child1OldLName = child1OldLName;
            this.child1NewFName = child1NewFName;
            this.child1NewMName = child1NewMName;
            this.child1NewLName = child1NewLName;

            this.child2OldFName = child2OldFName;
            this.child2OldMName = child2OldMName;
            this.child2OldLName = child2OldLName;
            this.child2NewFName = child2NewFName;
            this.child2NewMName = child2NewMName;
            this.child2NewLName = child2NewLName;

            this.child3OldFName = child3OldFName;
            this.child3OldMName = child3OldMName;
            this.child3OldLName = child3OldLName;
            this.child3NewFName = child3NewFName;
            this.child3NewMName = child3NewMName;
            this.child3NewLName = child3NewLName;

            this.dateOfChange = dateOfChange;
            this.DECREEDate = DECREEDate;
    }
  }

//function to take a copy from the pdf and fill the form
async function createPdf(input, output)
{
    const object = new ChangeOfName('1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51');
    try{
        //load the empty pdf
        const pdfDoc = await PDFDocument.load(await readFile(input));

        //Modify Doc , Fill out the form
        //get all the fields from pdf
        const fields = pdfDoc.getForm().getFields();
        //get all field names from pdf
        const fieldNames = pdfDoc.getForm().getFields().map(f => f.getName());
        //get the form
        const form = pdfDoc.getForm();
        //fill out the form
        form.getDropdown('form1[0].BodyPage1[0].S1[0].DropDownList1[0]').select(object.division);

        form.getTextField('form1[0].BodyPage1[0].S1[0].TextField4[0]').setText(object.petitionerFName);
        form.getTextField('form1[0].BodyPage1[0].S1[0].TextField4[1]').setText(object.petitionerMName);
        form.getTextField('form1[0].BodyPage1[0].S1[0].TextField4[2]').setText(object.petitionerLName);

        form.getTextField('form1[0].BodyPage1[0].S1[0].TextField4[3]').setText(object.streetAddress);
        form.getTextField('form1[0].BodyPage1[0].S1[0].TextField4[4]').setText(object.city);
        form.getTextField('form1[0].BodyPage1[0].S1[0].TextField4[5]').setText(object.state);
        form.getTextField('form1[0].BodyPage1[0].S1[0].TextField5[0]').setText(object.zip);

        form.getTextField('form1[0].BodyPage1[0].S1[0].DateTimeField3[0]').setText(object.petitionerDOB);
        form.getTextField('form1[0].BodyPage1[0].S1[0].TextField4[6]').setText(object.petitionerPlaceOfBirth);

        form.getTextField('form1[0].BodyPage1[0].S2[0].TextField4[0]').setText(object.spouseFName);
        form.getTextField('form1[0].BodyPage1[0].S2[0].TextField4[1]').setText(object.spouseMName);
        form.getTextField('form1[0].BodyPage1[0].S2[0].TextField4[2]').setText(object.spouseLName);

        form.getTextField('form1[0].BodyPage1[0].S2[0].DateTimeField2[0]').setText(object.spouseDOB);
        form.getTextField('form1[0].BodyPage1[0].S2[0].TextField4[3]').setText(object.spousePlaceOfBirth);

        
        form.getField('form1[0].BodyPage1[0].LG1[0].LG1[0]').setText(object.minorChildrenNames);
        form.getField('form1[0].BodyPage1[0].LG3[0].LG1[0]').setText(object.reasonForChange);
        
        form.getTextField('form1[0].BodyPage1[0].S4[0].TextField4[0]').setText(object.partiesChangedNamesBefore);

        form.getField('form1[0].BodyPage1[0].LG4[0].LG1[0]').setText(object.explain);

        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[5]').setText(object.petitionerOldFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[0]').setText(object.petitionerOldMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[1]').setText(object.petitionerOldLName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[4]').setText(object.petitionerNewFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[3]').setText(object.petitionerNewMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[2]').setText(object.petitionerNewLName);
        
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[8]').setText(object.spouserOldFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[7]').setText(object.spouseOldMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[6]').setText(object.spouseOldLName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[11]').setText(object.spouseNewFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[10]').setText(object.spouseNewMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[9]').setText(object.spouseNewLName);

        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[14]').setText(object.child1OldFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[13]').setText(object.child1OldMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[12]').setText(object.child1OldLName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[17]').setText(object.child1NewFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[16]').setText(object.child1NewMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[15]').setText(object.child1NewLName);
        
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[20]').setText(object.child2OldFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[19]').setText(object.child2OldMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[18]').setText(object.child2OldLName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[23]').setText(object.child2NewFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[22]').setText(object.child2NewMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[21]').setText(object.child2NewLName);        

        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[26]').setText(object.child3OldFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[25]').setText(object.child3OldMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[24]').setText(object.child3OldLName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[29]',).setText(object.child3NewFName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[28]').setText(object.child3NewMName);
        form.getTextField('form1[0].BodyPage1[0].S5[0].TextField4[27]').setText(object.child3NewLName);
        
        
        form.getTextField('form1[0].BodyPage1[0].S5[0].S6[0].DateTimeField1[0]',).setText(object.dateOfChange);
        form.getTextField('form1[0].BodyPage1[0].S5[0].S6[0].TextField6[0]',).setText(object.DECREEDate);
        console.log({fieldNames});



        //save the filled pdf
        const pdfBytes = await pdfDoc.save();
        await writeFile('filledPdf/'+output, pdfBytes);
        console.log('PDF created');

        //send email
        send_email.sendEmail(output,'alilast9899@gmail.com','Change of Name(s)');
        console.log('PDF sent!!');
        

    }catch (err){
        console.log(err);
    }
}
createPdf('formPdf/Blank-Name-change-Court-form-copy.pdf','Blank-Name-change-Court-form-copy-output.pdf');

