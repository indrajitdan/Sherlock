using DataAccessLayer.EF;
using DataCaptureModule.AddFieldValue;
using DataCaptureModule.EntryPoint.CommonLead;
using System.Collections.Specialized;
using System;

namespace DataCaptureModule.EntryPoint.Mortgage
{
    internal class MortgageLeadEntry : CommonLeadEntry
    {
        public override int CaptureLead(AllFieldCapture lead)
        {
            int leadId = base.CaptureLead(lead);

            t_mortgage_lead mortgage = new t_mortgage_lead()
            {
                lead_id = leadId,
                date_of_birth = lead.date_of_birth,
                age=lead.age,
                employment_status=lead.employement_status,
                period_term=lead.period_term,
                property_value=lead.property_value,
                loan_value=lead.loan_value,
                mortgage_type=lead.mortgage_type,
                current_debt=lead.current_debt,
                property_type=lead.product_type,
                property_location=lead.property_location,
                credit_history=lead.credit_history,
                annual_income=lead.annual_income,
                miss_any_loan=lead.miss_any_loan,
                had_bankruptcy=lead.had_bankruptcy,
                applied_iva=lead.applied_iva,
                had_ccj=lead.had_ccj,
                rate_id=lead.rate_id,
                repayment_id=lead.repayment_id

            }
            ;
            IModifyValues mv = new MortgageModifyValues();
            mv.ModifyLeadValues<t_mortgage_lead>(mortgage);

            return leadId;
        }

        private int con(string v)
        {
            throw new NotImplementedException();
        }
    }
}
