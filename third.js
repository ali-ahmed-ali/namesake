const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const send_email = require('./send_email');

//class for the data that we want to save on "AFFIDAVIT OF INDIGENCY" pdf
let  SocialSecurityCard = class{
    constructor(cardFName, cardMName, cardLName,birthFName, birthMName, birthLName, otherName, city, state, DOB,Citizen1,Citizen2,Citizen3,Citizen4,
        ethnicityYes,ethnicityNo, hawaiian, alaska, asian,americanIndian,black,otherPacific,white,male,female,
        motherFName, motherMName, motherLName, motherSecNum1,motherSecNum2,motherSecNum3, motherUnkown,
        fatherFName, fatherMName, fatherLName, fatherSecNum1,fatherSecNum2,fatherSecNum3, fatherUnkown,
        ssnbefore1,ssnbefore2,ssnbefore3,recentFName,recentMName,recentLName,differentDOB, todayDate, daytimeAreaCode,daytimeNumber,
        mailingStreet,mailingCity,mailingState,mailingZip,selfRel,naturalRel,legalRel,otherRel,otherRelSpecify,
        oldssn1,oldssn2,oldssn3) {
        this.cardFName = cardFName;
        this.cardMName = cardMName;
        this.cardLName = cardLName;
        this.birthFName = birthFName;
        this.birthMName = birthMName;
        this.birthLName = birthLName;
        this.otherName = otherName;
        this.city = city;
        this.state = state;
        this.DOB = DOB;
        this.Citizen1 = Citizen1;
        this.Citizen2 = Citizen2;
        this.Citizen3 = Citizen3;
        this.Citizen4 = Citizen4;
        this.ethnicityYes = ethnicityYes;
        this.ethnicityNo = ethnicityNo;
        this.hawaiian = hawaiian;
        this.alaska = alaska;
        this.asian = asian;
        this.americanIndian = americanIndian;
        this.black = black;
        this.otherPacific = otherPacific;
        this.white = white;
        this.male= male;
        this.female = female;
        this.motherFName = motherFName;
        this.motherMName = motherMName;
        this.motherLName = motherLName;
        this.motherSecNum1 = motherSecNum1;
        this.motherSecNum2 = motherSecNum2;
        this.motherSecNum3 = motherSecNum3;
        this.motherUnkown = motherUnkown;
        this.fatherFName = fatherFName;
        this.fatherMName = fatherMName;
        this.fatherLName = fatherLName;
        this.fatherSecNum1 = fatherSecNum1;
        this.fatherSecNum2 = fatherSecNum2;
        this.fatherSecNum3 = fatherSecNum3;
        this.fatherUnkown = fatherUnkown;
        this.ssnbefore1 = ssnbefore1;
        this.ssnbefore2 = ssnbefore2;
        this.ssnbefore3 = ssnbefore3;
        this.recentFName = recentFName;
        this.recentMName = recentMName;
        this.recentLName = recentLName;
        this.differentDOB = differentDOB;
        this.todayDate = todayDate;
        this.daytimeAreaCode = daytimeAreaCode;
        this.daytimeNumber = daytimeNumber;
        this.mailingStreet = mailingStreet;
        this.mailingCity = mailingCity;
        this.mailingState = mailingState;
        this.mailingZip = mailingZip;
        this.selfRel = selfRel;
        this.naturalRel = naturalRel;
        this.legalRel = legalRel;
        this.otherRel = otherRel;
        this.otherRelSpecify = otherRelSpecify;
        this.oldssn1 = oldssn1;
        this.oldssn2 = oldssn2;
        this.oldssn3 = oldssn3;
            
    }
  }

//function to take a copy from the pdf and fill the form
async function createPdf(input, output)
{
    const object = new SocialSecurityCard('First','Middle','Last','First','Middle','Last', 'other Name', 'city', 'state', 'DOB',true,true,true,true,
    true,true,true,true,true,true,true,true,true,  true,true,'First','Middle','Last',123,12,1234,true,
    'First','Middle','Last',123,12,1234,true,
    true,true,true,
    'First','Middle','Last',
    'DOB','today date','daytimeAreaCode','daytimeNumber',
    'Street','City', 'State','Zip',
    true,true,true,true,'other Rel',
    123,12,1234);
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

        //CARD First name field
        form.getTextField('topmostSubform[0].Page5[0].firstname[0]').setText(object.cardFName);
        //CARD Middle name field
        form.getTextField('topmostSubform[0].Page5[0].Middlename[0]').setText(object.cardMName);
        //CARD Last name field
        form.getTextField('topmostSubform[0].Page5[0].LastName[0]').setText(object.cardLName);

        //Birth First name field
        form.getTextField('topmostSubform[0].Page5[0].firstdiffname[0]').setText(object.birthFName);
        //Birth Middle name field
        form.getTextField('topmostSubform[0].Page5[0].Middlediffname[0]').setText(object.birthMName);
        //Birth Last name field
        form.getTextField('topmostSubform[0].Page5[0].Lastdiffname[0]').setText(object.birthLName);

        //OTHER NAMES used
        form.getTextField('topmostSubform[0].Page5[0].Othername[0]').setText(object.otherName);
        
        //old SOCIAL SECURITY NUMBER
        form.getTextField('topmostSubform[0].Page5[0].oldssnXXX[0]').setText(object.oldssn1+'');
        form.getTextField('topmostSubform[0].Page5[0].oldssnXX[0]').setText(object.oldssn2+'');
        form.getTextField('topmostSubform[0].Page5[0].oldssnXXXX[0]').setText(object.oldssn3+'');

        //City
        form.getTextField('topmostSubform[0].Page5[0].cityofbirth[0]').setText(object.city);
        //State
        form.getTextField('topmostSubform[0].Page5[0].stateatbirth[0]').setText(object.state);
        //Date of birth
        form.getTextField('topmostSubform[0].Page5[0].DateTimeField1[0]').setText(object.DOB);

        //U.S. Citizen
        if(object.Citizen1 == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].citizenship[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].citizenship[0]').uncheck();
        }
        //Legal Alien Allowed To Work
        if(object.Citizen2 == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].citizenship[1]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].citizenship[1]').uncheck();
        }
        //Legal Alien Not Allowed To Work
        if(object.Citizen3 == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].citizenship[2]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].citizenship[2]').uncheck();
        }
        //Other
        if(object.Citizen4 == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].citizenship[3]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].citizenship[3]').uncheck();
        }

        //ETHNICITY yes
        if(object.ethnicityYes == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].hispanicorlatino[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].hispanicorlatino[0]').uncheck();
        }
        //ETHNICITY no
        if(object.ethnicityNo == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].hispanicorlatino[1]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].hispanicorlatino[1]').uncheck();
        }

        //RACE
        //Native Hawaiian
        if(object.hawaiian == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].hawaiian[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].hawaiian[0]').uncheck();
        }
        //Alaska Native
        if(object.alaska == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].alaskanative[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].alaskanative[0]').uncheck();
        }
        //Asian
        if(object.asian == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].asian[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].asian[0]').uncheck();
        }
        //American Indian
        if(object.americanIndian == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].americanindian[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].americanindian[0]').uncheck();
        }
        //Black/African American
        if(object.black == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].blackafricanamerican[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].blackafricanamerican[0]').uncheck();
        }
        //Other Pacific Islander
        if(object.otherPacific == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].otherpacificislander[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].otherpacificislander[0]').uncheck();
        }
        //White
        if(object.white == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].white[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].white[0]').uncheck();
        }

        //Gender
        //Male
        if(object.male == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].Gender[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].Gender[0]').uncheck();
        }
        //Female
        if(object.female == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].Gender[1]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].Gender[1]').uncheck();
        }

        //Mother
        //Mother First name field
        form.getTextField('topmostSubform[0].Page5[0].mothersfirstname[0]').setText(object.motherFName);
        //Mother Middle name field
        form.getTextField('topmostSubform[0].Page5[0].mothersmiddlename[0]').setText(object.motherMName);
        //Mother Last name field
        form.getTextField('topmostSubform[0].Page5[0].motherslastname[0]').setText(object.motherLName);

        //MOTHER'S SOCIAL SECURITY NUMBER
        form.getTextField('topmostSubform[0].Page5[0].TextField15[0]').setText(object.motherSecNum1+'');
        form.getTextField('topmostSubform[0].Page5[0].TextField16[0]').setText(object.motherSecNum2+'');
        form.getTextField('topmostSubform[0].Page5[0].TextField17[0]').setText(object.motherSecNum3+'');
        //
        //Mother unknown
        if(object.motherUnkown == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].motherunknown[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].motherunknown[0]').uncheck();
        }
        ////////////
        //Father
        //Father First name field
        form.getTextField('topmostSubform[0].Page5[0].fathersfirstname[0]').setText(object.fatherFName);
        //Father Middle name field
        form.getTextField('topmostSubform[0].Page5[0].fathersmiddlename[0]').setText(object.fatherMName);
        //Father Last name field
        form.getTextField('topmostSubform[0].Page5[0].fatherslastname[0]').setText(object.fatherLName);

        //Father'S SOCIAL SECURITY NUMBER
        form.getTextField('topmostSubform[0].Page5[0].TextField18[0]').setText(object.fatherSecNum1+'');
        form.getTextField('topmostSubform[0].Page5[0].TextField110[0]').setText(object.fatherSecNum2+'');
        form.getTextField('topmostSubform[0].Page5[0].TextField19[0]').setText(object.fatherSecNum3+'');
        //
        //Father unknown
        if(object.fatherUnkown == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].fatherunknown[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].fatherunknown[0]').uncheck();
        }

        //
        //SOCIAL SECURITY NUMBER before
        //yes
        if(object.ssnbefore1 == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].ssnbefore[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].ssnbefore[0]').uncheck();
        }
        //no
        if(object.ssnbefore2 == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].ssnbefore[1]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].ssnbefore[1]').uncheck();
        }
        //unknow
        if(object.ssnbefore3 == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].ssnbefore[2]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].ssnbefore[2]').uncheck();
        }
        
        //Recent First name field
        form.getTextField('topmostSubform[0].Page5[0].firstnameonrecentcard[0]').setText(object.recentFName);
        //Recent Middle name field
        form.getTextField('topmostSubform[0].Page5[0].middlenameonrecentcard[0]').setText(object.recentMName);
        //Recent Last name field
        form.getTextField('topmostSubform[0].Page5[0].lastnameonrecentcard[0]').setText(object.recentLName);

        //different date of birth if used on an earlier application for a card
        form.getTextField('topmostSubform[0].Page5[0].DateTimeField2[0]').setText(object.differentDOB);
        //TODAY'S DATE
        form.getTextField('topmostSubform[0].Page5[0].DateTimeField2[1]').setText(object.todayDate);
        //DAYTIME Area code
        form.getTextField('topmostSubform[0].Page5[0].areacode[0]').setText(object.daytimeAreaCode);
        //DAYTIME number
        form.getTextField('topmostSubform[0].Page5[0].phonenumber[0]').setText(object.daytimeNumber);
        
        //MAILING
        form.getTextField('topmostSubform[0].Page5[0].streetaddress[0]').setText(object.mailingStreet);
        form.getTextField('topmostSubform[0].Page5[0].mailingcity[0]').setText(object.mailingCity);
        form.getTextField('topmostSubform[0].Page5[0].state[0]').setText(object.mailingState);
        form.getTextField('topmostSubform[0].Page5[0].zipcode[0]').setText(object.mailingZip);

        //RELATIONSHIP
        //Self
        if(object.selfRel == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].relationship[0]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].relationship[0]').uncheck();
        }
        //Natural
        if(object.naturalRel == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].relationship[1]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].relationship[1]').uncheck();
        }
        //Legal 
        if(object.legalRel == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].relationship[2]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].relationship[2]').uncheck();
        }
        //otherRelationship
        if(object.otherRel == true)
        {
            form.getCheckBox('topmostSubform[0].Page5[0].relationship[3]').check();
        }
        else{
            form.getCheckBox('topmostSubform[0].Page5[0].relationship[3]').uncheck();
        }
        //other Rel Specify
        form.getTextField('topmostSubform[0].Page5[0].TextField14[0]').setText(object.otherRelSpecify);


        console.log({fieldNames});
        //save the filled pdf
        const pdfBytes = await pdfDoc.save();

        await writeFile('filledPdf/'+output, pdfBytes);
        console.log('PDF created');

        //send email
        send_email.sendEmail(output,'alilast9899@gmail.com','Application for a Social Security Card');

    }catch (err){
        console.log(err);
    }
}
createPdf('formPdf/Social Security Card.pdf','Social Security Card output.pdf');

