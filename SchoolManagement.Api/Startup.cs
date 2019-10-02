using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using SchoolManagement.Business;
using SchoolManagement.Business.Interface;
using SchoolManagement.DataAccess;
using SchoolManagement.DataAccess.Interface;
using SchoolManagement.DataAccess.Models;
using SchoolManagement.Model;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.IO;
using System.Reflection;
using System.Text;

namespace SchoolManagement.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var conString = Configuration.GetConnectionString("DefaultConnection");

            var appSettingsSection = Configuration.GetSection("AppConfig");
            services.Configure<AppConfig>(appSettingsSection);

            services.AddCors();
            services.AddDbContext<SchoolEntities>(options => options.UseLazyLoadingProxies().UseSqlServer(conString));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            var appSettings = appSettingsSection.Get<AppConfig>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(option =>
            {
                option.RequireHttpsMetadata = false;
                option.SaveToken = true;
                option.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddScoped<IClassBusiness, ClassBusiness>();
            services.AddScoped<IClassDataAccess, ClassDataAccess>();
            services.AddScoped<IRoleBusiness, RoleBusiness>();
            services.AddScoped<IRoleDataAccess, RoleDataAccess>();
            services.AddScoped<IProfileBusiness, ProfileBusiness>();
            services.AddScoped<IProfileDataAccess, ProfileDataAccess>();
            services.AddScoped<IUserBusiness, UserBusiness>();
            services.AddScoped<IUserDataAccess, UserDataAccess>();
            services.AddScoped<IFeeBusiness, FeeBusiness>();
            services.AddScoped<IFeeDataAccess, FeeDataAccess>();
            services.AddScoped<IParentBusiness, ParentBusiness>();
            services.AddScoped<IParentDataAccess, ParentDataAccess>();
            services.AddScoped<IReportBusiness, ReportBusiness>();
            services.AddScoped<IReportDataAccess, ReportDataAccess>();
            services.AddScoped<IStudentBusiness, StudentBusiness>();
            services.AddScoped<IStudentDataAccess, StudentDataAccess>();
            services.AddScoped<ITransportBusiness, TransportBusiness>();
            services.AddScoped<ITransportDataAccess, TransportDataAccess>();
            services.AddScoped<IMasterBusiness, MasterBusiness>();
            services.AddScoped<IMasterDataAccess, MasterDataAccess>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(option =>
                {
                    option.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v2", new Info { Title = "School Management API", Version = "v2" });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            app.UseAuthentication();
            app.UseMvc();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v2/swagger.json", "School Management API");
                //c.RoutePrefix = string.Empty;
            });
        }
    }
}
