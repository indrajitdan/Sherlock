using System.Collections.Specialized;

namespace DataCaptureModule.EntryPoint.CommonLead
{
    public interface ILeadEntry
    {
        int CaptureLead(NameValueCollection lead);
    }
}
