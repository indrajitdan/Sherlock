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
    
    public partial class t_stage_master
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public t_stage_master()
        {
            this.t_common_lead_log = new HashSet<t_common_lead_log>();
            this.t_mortgage_lead_log = new HashSet<t_mortgage_lead_log>();
        }
    
        public int stage_id { get; set; }
        public decimal stage { get; set; }
        public string stage_detail { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_common_lead_log> t_common_lead_log { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_mortgage_lead_log> t_mortgage_lead_log { get; set; }
    }
}
