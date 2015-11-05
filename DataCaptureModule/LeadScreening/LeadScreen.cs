using DataAccessLayer.EF;
using DataCaptureModule.SpamFiltration;
using System;
using System.Text.RegularExpressions;

namespace DataCaptureModule.LeadScreening
{
    internal class LeadScreen : ILeadScreen
    {
        private readonly ISpamFilter _spamFilter;
        public LeadScreen()
        {
            _spamFilter = new SpamFilter();
        }

        public int ScreenLead(t_common_leads lead)
        {
          

            lead.first_name = (string.IsNullOrEmpty(lead.first_name)) ? "" : Regex.Replace(lead.first_name, @"[^a-zA-Z_]+", "");//remove special character and replace by space
          
            lead.last_name = (string.IsNullOrEmpty(lead.last_name)) ? "" : Regex.Replace(lead.last_name, @"[^a-zA-Z_]+", "");

            lead.Home_Mobile_Phone1 = (string.IsNullOrEmpty(lead.Home_Mobile_Phone1)) ? "" : Regex.Replace(lead.Home_Mobile_Phone1, @"[^0-9]", "").Replace("+44", "0044");

            lead.Home_Mobile_Phone2 = (string.IsNullOrEmpty(lead.Home_Mobile_Phone2)) ? "" : Regex.Replace(lead.Home_Mobile_Phone2, @"[^0-9]", "").Replace("+44", "0044");

            lead.city = (string.IsNullOrEmpty(lead.city)) ? "" : Regex.Replace(lead.city, @"[^a-zA-Z-]+[^\s]+", "");
                  
            lead.postcode = (string.IsNullOrEmpty(lead.postcode)) ? "" : Regex.Replace(lead.postcode, @"[^0-9a-zA-Z ]+", "");

            lead.address = (string.IsNullOrEmpty(lead.postcode)) ? "" : Regex.Replace(lead.address, @"[^0-9a-zA-Z-,' ]+", "");
        

            lead.email = (string.IsNullOrEmpty(lead.email)) ? "" : isValidEmail(lead.email);

          
            int leadId = _spamFilter.FilterSpam(lead);

            return leadId;
        }

        //private static string NewMethod(string Email)
        //{
        //    return Regex.IsMatch(Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
        //}

        public string isValidEmail(string inputEmail)
        {
            string strRegex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                  @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                  @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            Regex re = new Regex(strRegex);
            return "";
        }
    }
}
