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
    
    public partial class t_authentication_token
    {
        public int token_id { get; set; }
        public int user_id { get; set; }
        public string auth_token { get; set; }
        public System.DateTime issues_on { get; set; }
        public System.DateTime expires_on { get; set; }
    
        public virtual t_user_master t_user_master { get; set; }
    }
}