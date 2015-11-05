using DataCaptureModule.EntryPoint.CommonLead;
using Microsoft.Practices.Unity;
using System.Collections.Specialized;

namespace DataCaptureModule.EntryPoint.Handler
{
    public class EntryHandler : IEntryHandler
    {
        private readonly CommonLeadEntry _leadEntry;

        public EntryHandler(string product)
        {
            _leadEntry = UnityConfig.GetUnity().Resolve<CommonLeadEntry>(product);
        }

        public int CaptureLead(AllFieldCapture lead)
        {
            return _leadEntry.CaptureLead(lead);
        }
    }
}
