namespace TripleJWebApp.Models
{
    public class Song
    {
        public string TrackId { get; set; } = "";
        public string SongName { get; set; } = "";
        public string Artist { get; set; } = "";
        public string TrackImg { get; set; } = "";

        public List<string>? PlaylistOwners { get; set; } = new List<string>();  
    }
}
