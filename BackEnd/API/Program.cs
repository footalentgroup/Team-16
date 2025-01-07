using API.DataBase.Context;
using API.Modules.AuthModule.Interfaces;
using API.Modules.AuthModule;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using API.Modules.ExamModule.Dtos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

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

builder.Services.AddDbContext<AppDbContext>(p=> p.UseNpgsql(connectionString));

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.MapType<ParameterDto>(() => new OpenApiSchema
    {
        Type = "object",
        Properties =
        {
            ["id"] = new OpenApiSchema { Type = "integer" },
            ["name"] = new OpenApiSchema { Type = "string" },
            ["reference"] = new OpenApiSchema { Type = "string" },
            ["minValue"] = new OpenApiSchema { Type = "number", Format = "float" },
            ["maxValue"] = new OpenApiSchema { Type = "number", Format = "float" },
            ["unit"] = new OpenApiSchema { Type = "string" },
            ["gender"] = new OpenApiSchema { Type = "string" },
        }
    });
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
