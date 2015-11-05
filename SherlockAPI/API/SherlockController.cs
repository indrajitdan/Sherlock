using DataCaptureModule;
using DataCaptureModule.EntryPoint.Handler;
using System.Collections.Specialized;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace SherlockAPI.API
{
    public class SherlockController : ApiController
    {
        private IEntryHandler _entryHandler;

        [HttpPost]
        [ActionName("capturelead")]
        public IHttpActionResult CaptureLead(AllFieldCapture lead, string product)
        {
            //NameValueCollection nvc = form.ReadAsNameValueCollection();

            _entryHandler = new EntryHandler("mortgage");
            _entryHandler.CaptureLead(lead);

            return Ok();
        }
    }
}
