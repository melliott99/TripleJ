using TripleJWebApp.Models;

namespace TripleJWebApp.Services.Interfaces
{
    public interface IMusicService
    {
        Task<List<Song>> GetAllSongs();
    }
}
