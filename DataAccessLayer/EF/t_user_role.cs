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
    
    public partial class t_user_role
    {
        public int user_role { get; set; }
        public int user_id { get; set; }
        public int role_id { get; set; }
    
        public virtual t_role_master t_role_master { get; set; }
        public virtual t_user_master t_user_master { get; set; }
    }
}