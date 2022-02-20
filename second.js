const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const send_email = require('./send_email');

//class for the data that we want to save on "AFFIDAVIT OF INDIGENCY" pdf
let  AffidavitOfIndigency = class{
    constructor(court, caseName, nameOfApplicant, streetAndNumber, cityOrTown, stateAndZip, receivePublicAssistance, transitionalAidToFamilies,
        emergencyAidToElderlyDisabled, massachusettsVeterans, medicaidMassHealth, supplementalSecurity,MyIncomeCheckBox, amount, week, biweekly, month, year,
        householdOf,dependents,  availableHouseholdIncome,IAmUnableToPayCheckBox, lowerCost, filingFeeSurcharge, FilingFeeSurchargeChechBox,
        FilingFeeSurchargeAppealChechBox, FeesOrCostsForServingCheckBox, otherFeesCheckBox, substitutionSpecifyCheckBox,
        FilingFee, FeesOrCosts, OtherFees, Forspecify, substitutionSpecify, cost1CheckBox, cost1,cost1Specify, cost2CheckBox, cost2,
        CPCSPublicDefender, AppealBond, cost3CheckBox,cost3,cost4 , cost4Specify, cost4CheckBox, SubstitutionSpecifyCheckBox, substitutionSpecifyLast,
        DateSigned, signed) {
            this.court = court;
            this.caseName = caseName;
            this.nameOfApplicant = nameOfApplicant;
            this.streetAndNumber = streetAndNumber;
            this.cityOrTown = cityOrTown;
            this.stateAndZip = stateAndZip;
            this.receivePublicAssistance = receivePublicAssistance;
            this.transitionalAidToFamilies = transitionalAidToFamilies;
            this.emergencyAidToElderlyDisabled = emergencyAidToElderlyDisabled;
            this.massachusettsVeterans = massachusettsVeterans;
            this.medicaidMassHealth = medicaidMassHealth;
            this.supplementalSecurity = supplementalSecurity;
            this.MyIncomeCheckBox = MyIncomeCheckBox;
            this.amount = amount;
            this.week = week;
            this.biweekly = biweekly;
            this.month = month;
            this.year = year;
            this.householdOf = householdOf;
            this.dependents = dependents;
            this.availableHouseholdIncome = availableHouseholdIncome;
            this.IAmUnableToPayCheckBox = IAmUnableToPayCheckBox;
            this.lowerCost = lowerCost;
            this.filingFeeSurcharge = filingFeeSurcharge;
            this.FilingFeeSurchargeChechBox = FilingFeeSurchargeChechBox;
            this.FilingFeeSurchargeAppealChechBox = FilingFeeSurchargeAppealChechBox;
            this.FeesOrCostsForServingCheckBox = FeesOrCostsForServingCheckBox;
            this.otherFeesCheckBox = otherFeesCheckBox;
            this.substitutionSpecifyCheckBox = substitutionSpecifyCheckBox;
            this.FilingFee = FilingFee;
            this.FeesOrCosts = FeesOrCosts;
            this.OtherFees = OtherFees;
            this.Forspecify = Forspecify;
            this.substitutionSpecify = substitutionSpecify;
            this.cost1CheckBox = cost1CheckBox;
            this.cost1 = cost1;
            this.cost1Specify = cost1Specify;
            this.cost2CheckBox = cost2CheckBox;
            this.cost2 = cost2;
            this.CPCSPublicDefender = CPCSPublicDefender;
            this.AppealBond = AppealBond;
            this.cost3CheckBox = cost3CheckBox;
            this.cost3 = cost3;
            this.cost4 = cost4;
            this.cost4Specify = cost4Specify;
            this.cost4CheckBox = cost4CheckBox;
            this.SubstitutionSpecifyCheckBox = SubstitutionSpecifyCheckBox;
            this.substitutionSpecifyLast = substitutionSpecifyLast;
            this.DateSigned = DateSigned;
            this.signed = signed;
            
    }
  }

//function to take a copy from the pdf and fill the form
async function createPdf(input, output)
{
    const object = new AffidavitOfIndigency('court','Case Name','Name of applicant','street And Number', 'City or town','State and Zip',true,
    true,true, true, true, true, true,400, true, true, true, true,3,2,700,true,200, 200,true, true, true, true, true,500,1000,150, 'For Specify',
    'Substitution (specify)',true,100,'Cost 1 specify',true,200,true, true, true, 300, 400, 'cost 4 Specify', true, true,'substitution Specify', 'Date Signed',
    'signed');
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
        form.getTextField('Court').setText(object.court);
        form.getTextField('Case Name and Number if known').setText(object.caseName);

        form.getTextField('Name of applicant').setText(object.nameOfApplicant);

        form.getTextField('Street and number').setText(object.streetAndNumber);
        form.getTextField('City or town').setText(object.cityOrTown);
        form.getTextField('State and Zip').setText(object.stateAndZip);
        //A I receive public assistance under check form of public assistance received check box
        if(object.receivePublicAssistance == true)
        {
            form.getCheckBox('A I receive public assistance under check form of public assistance received').check();
        }
        else{
            form.getCheckBox('A I receive public assistance under check form of public assistance received').uncheck();
        }
        //Transitional Aid to Families with Dependent Children TAFDC check box
        if(object.transitionalAidToFamilies == true)
        {
            form.getCheckBox('Transitional Aid to Families with Dependent Children TAFDC').check();
        }
        else{
            form.getCheckBox('Transitional Aid to Families with Dependent Children TAFDC').uncheck();
        }
        //Emergency Aid to Elderly Disabled or Children EAEDC check box
        if(object.emergencyAidToElderlyDisabled == true)
        {
            form.getCheckBox('Emergency Aid to Elderly Disabled or Children EAEDC').check();
        }
        else{
            form.getCheckBox('Emergency Aid to Elderly Disabled or Children EAEDC').uncheck();
        }
        //Massachusetts Veterans Benefits Programs or check box
        if(object.massachusettsVeterans == true)
        {
            form.getCheckBox('Massachusetts Veterans Benefits Programs or').check();
        }
        else{
            form.getCheckBox('Massachusetts Veterans Benefits Programs or').uncheck();
        }
        //Medicaid MassHealth check box
        if(object.medicaidMassHealth == true)
        {
            form.getCheckBox('Medicaid MassHealth').check();
        }
        else{
            form.getCheckBox('Medicaid MassHealth').uncheck();
        }
        //MSupplemental Security Income SSI check box
        if(object.supplementalSecurity == true)
        {
            form.getCheckBox('Supplemental Security Income SSI').check();
        }
        else{
            form.getCheckBox('Supplemental Security Income SSI').uncheck();
        }
        //MSupplemental Security Income SSI check box
        if(object.supplementalSecurity == true)
        {
            form.getCheckBox('Supplemental Security Income SSI').check();
        }
        else{
            form.getCheckBox('Supplemental Security Income SSI').uncheck();
        }

        //
        //My income check box
        if(object.MyIncomeCheckBox == true)
        {
            form.getCheckBox('B').check();
        }
        else{
            form.getCheckBox('B').uncheck();
        }
        //amount $
        form.getTextField('persons consisting of myself and').setText(object.amount+'');
        //week check box
        if(object.week == true)
        {
            form.getCheckBox('week').check();
        }
        else{
            form.getCheckBox('week').uncheck();
        }
        //biweekly check box
        if(object.biweekly == true)
        {
            form.getCheckBox('biweekly').check();
        }
        else{
            form.getCheckBox('biweekly').uncheck();
        }
        //month check box
        if(object.month == true)
        {
            form.getCheckBox('month').check();
        }
        else{
            form.getCheckBox('month').uncheck();
        }
        //year check box
        if(object.year == true)
        {
            form.getCheckBox('year').check();
        }
        else{
            form.getCheckBox('year').uncheck();
        }
        //check the period that applies for a household of 
        form.getTextField('check the period that applies for a household of').setText(object.householdOf+'')
        //dependents
        form.getTextField('which income is at or below the court systems poverty level Note The court systems poverty levels for households').setText(object.dependents+'');
        //List any other available household income for the checked period on this line
        form.getTextField('List any other available household income for the checked period on this line').setText(object.availableHouseholdIncome+'');

        //I am unable to pay
        if(object.IAmUnableToPayCheckBox == true)
        {
            form.getCheckBox('C').check();
        }
        else{
            form.getCheckBox('C').uncheck();
        }
        //
        //lower cost paid for by the state Check all that apply and in any
        form.getTextField('lower cost paid for by the state Check all that apply and in any').setText(object.lowerCost+'');
        
        //Filing fee and any surcharge check box
        if(object.FilingFeeSurchargeChechBox == true)
        {
            form.getCheckBox('Filing fee and any surcharge').check();
        }
        else{
            form.getCheckBox('Filing fee and any surcharge').uncheck();
        }
        //Filing fee and any surcharge
        form.getTextField('guess as to the cost if known').setText(object.filingFeeSurcharge+'');

        //Filing fee and any surcharge and appeal check box
        if(object.FilingFeeSurchargeAppealChechBox == true)
        {
            form.getCheckBox('Filing fee and any surcharge for appeal').check();
        }
        else{
            form.getCheckBox('Filing fee and any surcharge for appeal').uncheck();
        }
        //Filing fee and any surcharge for appeal field
        form.getTextField('undefined').setText(object.FilingFee+'');

        // Fees or costs for serving court summons, witness subpoenas or other court papers. $ check box
        if(object.FeesOrCostsForServingCheckBox == true)
        {
            form.getCheckBox('Fees or costs for serving court summons witness subpoenas or other court papers').check();
        }
        else{
            form.getCheckBox('Fees or costs for serving court summons witness subpoenas or other court papers').uncheck();
        }
        //Fees or costs for serving court summons, witness subpoenas or other court papers. $
        form.getTextField('undefined_2').setText(object.FeesOrCosts+'');

        //Other fees or costs of check box
        if(object.otherFeesCheckBox == true)
        {
            form.getCheckBox('Other fees or costs of').check();
        }
        else{
            form.getCheckBox('Other fees or costs of').uncheck();
        }
        //Other fees or costs of $ field
        form.getTextField('undefined_3').setText(object. OtherFees+'' );
        //Other fees or costs specify field
        form.getTextField('for  specify').setText(object. Forspecify );

        //Substitution specify check box
        if(object.substitutionSpecifyCheckBox == true)
        {
            form.getCheckBox('Substitution specify').check();
        }
        else{
            form.getCheckBox('Substitution specify').uncheck();
        }
        // Substitution (specify): field
        form.getTextField('undefined_4').setText(object.substitutionSpecify);
        

        //Section 3:

        //Cost 1 check box
        if(object.cost1CheckBox == true)
        {
            form.getCheckBox('Cost').check();
        }
        else{
            form.getCheckBox('Cost').uncheck();
        }
        // Cost 1 field
        form.getTextField('of expert services for testing examination testimony or other assistance specify').setText(object.cost1+'');
        // Cost 1 specify field
        form.getTextField('of taking andor transcribing a deposition of specify name of person').setText(object.cost1Specify);

        //Cost 2 check box
        if(object.cost2CheckBox == true)
        {
            form.getCheckBox('Cost_2').check();
        }
        else{
            form.getCheckBox('Cost_2').uncheck();
        }
        // Cost 2 field
        form.getTextField('undefined_5').setText(object.cost2+'');       
        
        //Cassette copies of tape recording of trial or other proceeding, needed to prepare appeal for applicant not represented by Committee for Public Counsel Services (CPCS-public defender).
        if(object.CPCSPublicDefender == true)
        {
            form.getCheckBox('Cassette copies of tape recording of trial or other proceeding needed to prepare appeal for applicant not').check();
        }
        else{
            form.getCheckBox('Cassette copies of tape recording of trial or other proceeding needed to prepare appeal for applicant not').uncheck();
        }

        //Appeal bond check box
        if(object.AppealBond == true)
        {
            form.getCheckBox('Appeal bond').check();
        }
        else{
            form.getCheckBox('Appeal bond').uncheck();
        }

        //Cost 3 check box
        if(object.cost3CheckBox == true)
        {
            form.getCheckBox('Cost_3').check();
        }
        else{
            form.getCheckBox('Cost_3').uncheck();
        }
        // Cost 3 field
        form.getTextField('of preparing written transcript of trial or other proceeding').setText(object.cost3+'');

        // Cost 4 field
        form.getTextField('undefined_6').setText(object.cost4+'');
        //cost 4 Specify 
        form.getTextField('for  specify_2').setText(object.cost4Specify+'');

        //Cost 4 check box
        if(object.cost4CheckBox == true)
        {
            form.getCheckBox('Other fees and costs').check();
        }
        else{
            form.getCheckBox('Other fees and costs').uncheck();
        }


        //Substitution Specify Check Box
        if(object.SubstitutionSpecifyCheckBox == true)
        {
            form.getCheckBox('Substitution specify_2').check();
        }
        else{
            form.getCheckBox('Substitution specify_2').uncheck();
        }
        //Substitution (specify) field
        form.getTextField('undefined_7').setText(object.substitutionSpecifyLast);
        
        //Date signed
        form.getField('Date signed').setText(object.DateSigned);
        
        //Signed under the penalties of perjury
        form.getField('x').setText(object.signed);

        
        

        console.log({fieldNames});
    
        //save the filled pdf
        const pdfBytes = await pdfDoc.save();

        await writeFile('filledPdf/'+output, pdfBytes);
        console.log('PDF created');

        //send email
        send_email.sendEmail(output,'alilast9899@gmail.com','AFFIDAVIT OF INDIGENCY');

    }catch (err){
        console.log(err);
    }
}

createPdf('formPdf/jud-affidavit-of-indigency-821.pdf','jud-affidavit-of-indigency-821-output.pdf');

