using Microsoft.EntityFrameworkCore;
using CFN_ServerAdmin.Data;
using CFN_ServerAdmin.Services;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;



namespace CFN_ServerAdmin
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("tX6OvbcF0WmFCwoUMnnHaEbKeAOOAjgLKFQnSWA5ZTkC8n2GAqqLpHonrTj4lk88mAHpJzZGCT6RSzRDTqvqcnI2p1kL7VrghRi")),
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddControllers();
            services.AddControllersWithViews();

            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            // Подключение к базе данных PostgreSQL
            services.AddDbContext<DbContextCFN>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"))
            );

            // Регистрация сервисов
            services.AddScoped<IFeedbackService, FeedbackService>();
            services.AddScoped<IQAService, QAService>();
            services.AddScoped<IDiscussionService, DiscussionService>();
            services.AddScoped<ISuggestionService, SuggestionService>();
            services.AddScoped<IAuthService, AuthService>();


            // Добавление CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost3001",
                    builder =>
                    {
                        builder.WithOrigins("http://admin:3001")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });


            // Добавление Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CFN Server API", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CFN Server API v1"));
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("AllowLocalhost3001");


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMiddleware<AuthErrorHandlingMiddleware>(); // Обработка ошибок аутентификации
            app.UseMiddleware<ErrorHandlingMiddleware>();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapControllers();
            });
        }



    }
}