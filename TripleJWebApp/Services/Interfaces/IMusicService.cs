using Microsoft.AspNetCore.Mvc;
using TripleJWebApp.Models;

namespace TripleJWebApp.Services.Interfaces
{
    public interface IMusicService
    {
        Task<List<Song>> GetAllSongs(String userId);
        Task<Boolean> SubmitVotes(List<Song> votes, string voter);

    }
}
