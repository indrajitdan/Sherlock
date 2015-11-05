using DataAccessLayer.EF;
using DataAccessLayer.EF.Model.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class Class1 : Interface1
    {
        public void GetData()
        {
            GenericRepository<t_loan_lead> loan = new GenericRepository<t_loan_lead>(new sherlockEntities());
            loan.GetAll();

            GenericRepository<t_life_lead> life = new GenericRepository<t_life_lead>(new sherlockEntities());
            life.GetAll();

            GenericRepository<t_asu_lead> asu = new GenericRepository<t_asu_lead>(new sherlockEntities());
            asu.GetAll();

            GenericRepository<t_debt_lead> debt = new GenericRepository<t_debt_lead>(new sherlockEntities());
            debt.GetAll();

            GenericRepository<t_equityrelease_lead> equityrelease = new GenericRepository<t_equityrelease_lead>(new sherlockEntities());
            equityrelease.GetAll();

            GenericRepository<t_logbookloan_lead> logbookloan = new GenericRepository<t_logbookloan_lead>(new sherlockEntities());
            logbookloan.GetAll();

            GenericRepository<t_mortgage_lead> mortgage = new GenericRepository<t_mortgage_lead>(new sherlockEntities());
            mortgage.GetAll();

            GenericRepository<t_pmi_lead> pmi = new GenericRepository<t_pmi_lead>(new sherlockEntities());
            pmi.GetAll();

            GenericRepository<t_ppi_lead> ppi = new GenericRepository<t_ppi_lead>(new sherlockEntities());
            ppi.GetAll();

            GenericRepository<t_sme_mi_lead> sme_mi = new GenericRepository<t_sme_mi_lead>(new sherlockEntities());
            sme_mi.GetAll();

            GenericRepository<t_solar_lead> solar = new GenericRepository<t_solar_lead>(new sherlockEntities());
            solar.GetAll();
        }





    }
}
