using DataAccessLayer.EF;
using DataAccessLayer.EF.Model.GenericRepository;
using DataCaptureModule.AddFieldValue;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataCaptureModule.SpamFiltration
{
    internal class SpamFilter : ISpamFilter
    {
        private readonly IModifyValues _modifyValue;

        public SpamFilter()
        {
            _modifyValue = new CommonModifyValues();
        }

        public int FilterSpam(t_common_leads lead)
        {
            //??
            //lead.email is the modified email id; it was passed from screening // nw i nd ths mdf_fild for spam checking

            if ((SpamFlagName(lead.first_name)) || (SpamFlagName(lead.last_name)) &&
                (SpamFlagPhone(lead.Home_Mobile_Phone1)) || (SpamFlagPhone(lead.Home_Mobile_Phone2))
                && SpamFlagEmail(lead.email) && SpamFlagIp(lead.ip_address) )
            {
                lead.lead_status = "Spam";
            }

            if(SpamCheck90Days())
            {
                lead.lead_status = "Duplicate Entry";
            }
           
            int leadId = _modifyValue.ModifyLeadValues<t_common_leads>(lead);

            return leadId;
        }
        private bool SpamFlagName(string name)
        {

            return false;
        }
        private bool SpamFlagPhone(string Phone)
        {
            return false;
        }


        private bool SpamFlagIp(string Ipaddress)
        {
            return false;
        }
        private bool SpamFlagEmail(string email)
        {
            //logic of spam check
            GenericRepository<t_common_leads> gnr = new GenericRepository<t_common_leads>(new sherlockEntities());

            t_common_leads spamEmails = gnr.GetFirst(x => x.email == email);
            if (spamEmails != null)
                return true;

            return false;
        }

        private bool SpamCheck90Days(t_common_leads lead)
        {
            GenericRepository<t_common_leads> gnr = new GenericRepository<t_common_leads>(new sherlockEntities());

            List<t_common_leads> spamEmails = (List<t_common_leads>)gnr.GetMany(x =>
           x.first_name.Equals(lead.first_name)
           && x.last_name.Equals(lead.last_name)
            );

            if (spamEmails.Count > 0)
                return true;

            return false;
        }
    }
}
