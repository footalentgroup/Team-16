using API.DataBase.Context;
using API.Modules.AuthModule;
using API.Modules.AuthModule.Interfaces;
using API.Modules.DoctorModule;
using API.Modules.DoctorModule.Interfaces;
using API.Modules.ExamModule;
using API.Modules.ExamModule.Dtos;
using API.Modules.ExamModule.Interfaces;
using API.Modules.PatientModule;
using API.Modules.PatientModule.Interfaces;
using API.Modules.ResultModule;
using API.Modules.ResultModule.Dtos;
using API.Modules.ResultModule.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new ParameterDtoConverter());
        options.JsonSerializerOptions.Converters.Add(new ResultDtoConverter());
    });

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(p => p.UseNpgsql(connectionString));

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IExamService, ExamService>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IResultService, ResultService>();
builder.Services.AddScoped<IReportService, ResultService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Settings:Token").Value!)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.MapType<ParameterDto>(() => new OpenApiSchema
    {
        Type = "object",
        Properties =
        {
            ["name"] = new OpenApiSchema { Type = "string" },
            ["type"] = new OpenApiSchema { Type = "string" },
            ["reference"] = new OpenApiSchema { Type = "string" },
            ["minValue"] = new OpenApiSchema { Type = "number", Format = "float" },
            ["maxValue"] = new OpenApiSchema { Type = "number", Format = "float" },
            ["unit"] = new OpenApiSchema { Type = "string" },
            ["gender"] = new OpenApiSchema { Type = "string" },
        }
    });

    c.MapType<ResultResponseDto>(() => new OpenApiSchema
    {
        Type = "object",
        Properties =
        {
            ["id"] = new OpenApiSchema { Type = "int" },
            ["type"] = new OpenApiSchema { Type = "string" },
            ["valueresult"] = new OpenApiSchema { Type = "string" },
            ["parameterid"] = new OpenApiSchema { Type = "int" },
            ["dateresult"] = new OpenApiSchema { Type = "datetime" },
        }
    });
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);


    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.OperationFilter<SecurityRequirementsOperationFilter>();
});


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
