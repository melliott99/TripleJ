using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TripleJWebApp.Models;

namespace TripleJWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SongController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;

        public SongController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }


        [HttpGet(Name = "GetSongs")]
        public IEnumerable<Song> Get()
        {
            List<Song> songList = null;
            using(StreamReader r = new StreamReader("static/music.json"))
            {
                songList = JsonConvert.DeserializeObject<List<Song>>(r.ReadToEnd());
            }

            return songList;
        }
    }
}