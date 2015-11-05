using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Formatting;

namespace TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            CallApi();
        }

        private async static void CallApi()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:58300/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var gizmo = new Product() { Name = "Gizmo", Price = 100, Category = "Widget" };
                HttpResponseMessage response = await client.PostAsJsonAsync("api/sherlock", gizmo);
            }
        }
    }

    class Product
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Category { get; set; }
    }
}
