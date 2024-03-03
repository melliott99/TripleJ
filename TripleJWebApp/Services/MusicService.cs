using AutoMapper;
using Microsoft.IdentityModel.Abstractions;
using PlaylistDataProcessor.Models;
using PlaylistDataProcessor.Repository;
using TripleJWebApp.Models;
using TripleJWebApp.Services.Interfaces;

namespace TripleJWebApp.Services
{
    public class MusicService : IMusicService
    {
        private readonly ILogger<MusicService> _logger;
        private readonly DatabaseConnection _connection;
        private readonly IMapper _mapper;

        public MusicService(ILogger<MusicService> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _connection = new DatabaseConnection();
        }

        public async Task<List<Song>> GetAllSongs()
        {
            var result = await _connection.GetAllSongs();
   
            return _mapper.Map<List<PlaylistRow>, List<Song>>(result);
            
        }



    }
}
