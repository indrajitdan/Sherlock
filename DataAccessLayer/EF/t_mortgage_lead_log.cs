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
    
    public partial class t_mortgage_lead_log
    {
        public int mortgage_log_id { get; set; }
        public int mortgage_lead_id { get; set; }
        public int stage_id { get; set; }
    
        public virtual t_stage_master t_stage_master { get; set; }
    }
}
