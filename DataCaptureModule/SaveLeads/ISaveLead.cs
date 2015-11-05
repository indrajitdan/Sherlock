namespace DataCaptureModule.SaveLeads
{
    interface ISaveLead
    {
        int SaveLeadDetails<T>(T lead) where T : class;
    }
}
