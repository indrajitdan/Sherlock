using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCaptureModule
{
    public class AllFieldCapture
    {
        //commonTable
        public string title { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string city { get; set; }
        public string postcode { get; set; }
        public string Home_Mobile_Phone1 { get; set; }
        public string Home_Mobile_Phone2 { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public int product_id { get; set; }
        public string ip_address { get; set; }
        public string source { get; set; }
        public string match_type { get; set; }
        public string keyword { get; set; }
        public string lead_status { get; set; }

        //mortgage
        public DateTime date_of_birth { get; set; }
        public int age { get; set; }
        public int employment_status { get; set; }
        public string period_term { get; set; }
        public string property_value { get; set; }
        public string loan_value { get; set; }
        public int mortgage_type { get; set; }
        public string current_debt { get; set; }
        public int property_type { get; set; }
        public int property_location { get; set; }
        public int credit_history { get; set; }
        public string annual_income { get; set; }
        public string miss_any_loan { get; set; }
        public string had_bankruptcy { get; set; }
        public string applied_iva { get; set; }
        public string had_ccj { get; set; }
        public int rate_id { get; set; }
        public int repayment_id { get; set; }

        //loan
        //public System.DateTime date_of_birth { get; set; } /// <summary>     
        //public int age { get; set; }
        //public int employment_status { get; set; }
        //public int period { get; set; }
        //public string property_value { get; set; }
        //public string loan_value { get; set; }
        public int loan_type { get; set; }
        public int loan_purpose_id { get; set; }
        public string home_owner { get; set; }
        public string mortgage_balance { get; set; }
        public string query_string { get; set; }
        public string marital_status { get; set; }
        public int country_of_residance { get; set; }
        //public int annual_income { get; set; }
        public int credit_rating { get; set; }
        public string loan_guarantor { get; set; }
        public string been_in_debt { get; set; }
        public int total_creditor { get; set; }
        public DateTime address_start_date { get; set; }
        public string occupation { get; set; }
        public string employer_name { get; set; }
        public DateTime employer_since { get; set; }
        public string previous_address { get; set; }
        public string previous_city { get; set; }
        public string previous_postcode { get; set; }
        public DateTime previous_address_since { get; set; }

        //asu

        //public System.DateTime date_of_birth { get; set; }
        //public int age { get; set; }
        //public int employment_status { get; set; }
        public int period { get; set; }
        public int amount { get; set; }
        public string smoker { get; set; }
        public int cover_type { get; set; }
        public int product_type { get; set; }

        //debt
        //public System.DateTime date_of_birth { get; set; }
        //public int age { get; set; }
        public int employement_status { get; set; }
        public int resinedtial_location { get; set; }
        public int total_creditors { get; set; }
        public Nullable<int> debt_type { get; set; }
        public int total_unsecured_debt { get; set; }
        public int monthly_repayment { get; set; }
        public Nullable<int> monthly_income { get; set; }
        public Nullable<int> monthly_disposable { get; set; }
        public int debt_residential_status_id { get; set; }

        //equityrelease

        //public System.DateTime date_of_birth { get; set; }
        //public int age { get; set; }
        //public string property_value { get; set; }
        //public string mortgage_balance { get; set; }



    }
}
