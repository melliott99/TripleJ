using Microsoft.AspNetCore.Mvc;
using TripleJWebApp.Models;

namespace TripleJWebApp.Services.Interfaces
{
    public interface IMusicService
    {
        Task<List<Song>> GetAllSongs();
        Task<IActionResult> SubmitVotes(List<Song> votes, string voter);

    }
}
