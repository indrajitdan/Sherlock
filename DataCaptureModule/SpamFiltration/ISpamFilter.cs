using DataAccessLayer.EF;

namespace DataCaptureModule.SpamFiltration
{
    interface ISpamFilter
    {
        int FilterSpam(t_common_leads lead);
    }
}
