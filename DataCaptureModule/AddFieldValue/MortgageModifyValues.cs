using DataAccessLayer.EF;
using DataCaptureModule.SaveLeads;
using System;

namespace DataCaptureModule.AddFieldValue
{
    internal class MortgageModifyValues : IModifyValues
    {
        private readonly ISaveLead _saveLead;

        public MortgageModifyValues()
        {
            _saveLead = new SaveLead();
        }

        public int ModifyLeadValues<T>(T lead)
        {
            t_mortgage_lead tl = (t_mortgage_lead)Convert.ChangeType(lead, typeof(t_mortgage_lead));

            //now modify the values as per business logic - change in post code/some values

            int leadId = _saveLead.SaveLeadDetails<t_mortgage_lead>(tl);

            return leadId;
        }
    }
}
