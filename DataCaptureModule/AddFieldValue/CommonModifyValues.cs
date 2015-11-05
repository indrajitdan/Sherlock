using DataAccessLayer.EF;
using DataCaptureModule.SaveLeads;
using System;

namespace DataCaptureModule.AddFieldValue
{
    internal class CommonModifyValues : IModifyValues
    {
        private readonly ISaveLead _saveLead;

        public CommonModifyValues()
        {
            _saveLead = new SaveLead();
        }

        public int ModifyLeadValues<T>(T lead)
        {
            t_common_lead_log tl = (t_common_lead_log)Convert.ChangeType(lead, typeof(t_common_lead_log));
            //t_common_leads_log commn_log = tl;

            int leadId = _saveLead.SaveLeadDetails<t_common_lead_log>(tl);

            return leadId;
        }
    }
}
