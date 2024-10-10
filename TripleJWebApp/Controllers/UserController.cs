using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TripleJWebApp.Infrastructure;
using TripleJWebApp.Models;
using TripleJWebApp.Services.Interfaces;

namespace TripleJWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMusicService _musicService;
        private readonly ILogger<SongController> _logger;

        public UserController(ILogger<SongController> logger, IMusicService musicService)
        {
            _logger = logger;
            _musicService = musicService;
        }

        [HttpGet]
        [Route(ActionRoutes.ValidateUsers)]
        [ProducesResponseType(typeof(User), 200)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> ValidateUser(string UserId)
        {
            User user = new();
            user.UserId = UserId;
            user.UserName = await _musicService.ValidateUser(UserId);

            if (user.UserName == "N/A")
            {
                return BadRequest(user);
            }
            return Ok(user);
        }
    }
}