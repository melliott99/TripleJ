using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaylistDataProcessor.Models
{
    public class VotingRow
    {
        public string SongName { get; set; } = string.Empty;
        public string Artist { get; set; } = string.Empty;
        public string TrackId { get; set; } = string.Empty;
        public string TrackImg { get; set; } = string.Empty;
        public int Point { get; set; } = 0;
        public string Voter { get; set; } = string.Empty;

    }
}
