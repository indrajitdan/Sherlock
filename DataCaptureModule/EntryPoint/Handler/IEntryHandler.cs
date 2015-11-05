using System.Collections.Specialized;

namespace DataCaptureModule.EntryPoint.Handler
{
    public interface IEntryHandler
    {
        int CaptureLead(AllFieldCapture lead);
    }
}
