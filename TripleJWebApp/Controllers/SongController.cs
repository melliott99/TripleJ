using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TripleJWebApp.Infrastructure;
using TripleJWebApp.Models;

namespace TripleJWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SongController : ControllerBase
    {

        private readonly ILogger<SongController> _logger;

        public SongController(ILogger<SongController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        [Route(ActionRoutes.Empty)]
        [ProducesResponseType(typeof(List<Song>), 200)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> GetAllSongs()
        {
            List<Song>? response;
            using(StreamReader r = new StreamReader("static/music.json"))
            {
                response = JsonConvert.DeserializeObject<List<Song>>(r.ReadToEnd());
            }

            if(response == null)
            {
                return NoContent();
            }
            return Ok(response);
        }

        
        //[HttpGet(Name = "PostSongs")]
        //public 
    }
}