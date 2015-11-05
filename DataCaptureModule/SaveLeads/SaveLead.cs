using DataAccessLayer.EF;
using DataAccessLayer.EF.Model.GenericRepository;

namespace DataCaptureModule.SaveLeads
{
    public class SaveLead : ISaveLead
    {
        public int SaveLeadDetails<T>(T lead) where T : class
        {
            GenericRepository<T> gnr = new GenericRepository<T>(new sherlockEntities());
            gnr.Insert(lead);

            return 0;
        }
    }
}
