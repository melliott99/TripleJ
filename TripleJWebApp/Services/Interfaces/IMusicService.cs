using Microsoft.AspNetCore.Mvc;
using TripleJWebApp.Models;

namespace TripleJWebApp.Services.Interfaces
{
    public interface IMusicService
    {
        Task<List<Song>> GetAllSongs(string userId);

        Task<List<Song>> GetUserVotedSongs(string userId);

        Task<bool> SubmitVotes(List<Song> votes, string voter);

        Task<string> ValidateUser(string userId);
    }
}
