using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TripleJWebApp.Infrastructure;
using TripleJWebApp.Models;
using TripleJWebApp.Services.Interfaces;

namespace TripleJWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SongController : ControllerBase
    {
        private readonly IMusicService _musicService;
        private readonly ILogger<SongController> _logger;

        public SongController(ILogger<SongController> logger, IMusicService musicService)
        {
            _logger = logger;
            _musicService = musicService;
        }


        [HttpGet]
        [Route(ActionRoutes.Empty)]
        [ProducesResponseType(typeof(List<Song>), 200)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> GetAllSongs()
        {
            List<Song>? response;

            response = await _musicService.GetAllSongs();

            if (response == null)
            {
                return NoContent();
            }
            return Ok(response);
        }


        [HttpPost]
        [Route(ActionRoutes.VoteSongs)]
        [ProducesResponseType(typeof(List<Song>), 200)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SubmitVotes([Bind("trackId, songName, artist, trackImg")] List<Song> votes, string voter)
        {
            if (ModelState.IsValid)
            {
                var isSuccessful = await _musicService.SubmitVotes(votes, voter);
                if (isSuccessful)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }
    }
}