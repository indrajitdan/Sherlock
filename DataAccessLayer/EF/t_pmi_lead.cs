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
    
    public partial class t_pmi_lead
    {
        public int pmi_lead_id { get; set; }
        public int lead_id { get; set; }
        public System.DateTime date_of_birth { get; set; }
        public int age { get; set; }
        public int policy_member { get; set; }
        public string existing_policy { get; set; }
        public int cover_type { get; set; }
        public string smoker { get; set; }
    
        public virtual t_common_leads t_common_leads { get; set; }
    }
}
