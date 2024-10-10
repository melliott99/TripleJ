using AutoMapper;
using PlaylistDataProcessor.Models;
using TripleJWebApp.Mappings;
using TripleJWebApp.Models;
using TripleJWebApp.Services;
using TripleJWebApp.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyHeader())
);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IMusicService, MusicService>();

//AutoMapper
builder.Services.AddAutoMapper(typeof(SongMapper));

var app = builder.Build();
app.UseCors();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
