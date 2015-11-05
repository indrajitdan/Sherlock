using DataAccessLayer.EF;
using DataCaptureModule.LeadScreening;
using System.Collections.Specialized;
using System;
using DataCaptureModule.SaveLeads;

namespace DataCaptureModule.EntryPoint.CommonLead
{
    internal class CommonLeadEntry //: ILeadEntry
    {
        private readonly ILeadScreen _leadScreen;
        private readonly ISaveLead _saveLead;
        public CommonLeadEntry()
        {
            _leadScreen = new LeadScreen();
            _saveLead = new SaveLead();
        }

        public virtual int CaptureLead(AllFieldCapture lead)
        {

            t_common_leads commonLead = new t_common_leads()
            {
                title = lead.title,
                first_name = lead.first_name,
                last_name = lead.last_name,
                city = lead.city,
                postcode = lead.postcode,
                Home_Mobile_Phone1 = lead.Home_Mobile_Phone1,
                Home_Mobile_Phone2 = lead.Home_Mobile_Phone2,
                address = lead.address,
                email = lead.email,
                product_id = lead.product_id,
                ip_address = lead.ip_address,
                source = lead.source,
                match_type = lead.match_type,
                keyword = lead.keyword,
                lead_status =lead.lead_status



            };

            int leadId = _saveLead.SaveLeadDetails<t_common_leads>(commonLead);
            commonLead.lead_id = leadId;
            _leadScreen.ScreenLead(commonLead);

            return leadId;
        }

        private int conver(string v)
        {
            throw new NotImplementedException();
        }
    }
}
