//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataAccessLayer.EF
{
    using System;
    using System.Collections.Generic;
    
    public partial class t_mortgage_lead
    {
        public int mortgage_lead_id { get; set; }
        public int lead_id { get; set; }
        public System.DateTime date_of_birth { get; set; }
        public int age { get; set; }
        public int employment_status { get; set; }
        public string period_term { get; set; }
        public string property_value { get; set; }
        public string loan_value { get; set; }
        public int mortgage_type { get; set; }
        public string current_debt { get; set; }
        public int property_type { get; set; }
        public int property_location { get; set; }
        public int credit_history { get; set; }
        public string annual_income { get; set; }
        public string miss_any_loan { get; set; }
        public string had_bankruptcy { get; set; }
        public string applied_iva { get; set; }
        public string had_ccj { get; set; }
        public int rate_id { get; set; }
        public int repayment_id { get; set; }
    
        public virtual t_common_leads t_common_leads { get; set; }
    }
}