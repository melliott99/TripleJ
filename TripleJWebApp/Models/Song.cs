namespace TripleJWebApp.Models
{
    public class Song
    {
        public string Id = Guid.NewGuid().ToString();
        public string SongName { get; set; } = "";
        public string Artist { get; set; } = "";
        public string ArtUrl { get; set; } = "";
    }
}
