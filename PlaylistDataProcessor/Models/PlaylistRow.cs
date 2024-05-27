using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;
using CsvHelper.Configuration.Attributes;

namespace PlaylistDataProcessor.Models
{
    public class PlaylistRow
    {
        [Index(1)]
        public string Song { get; set; } = string.Empty;

        [Index(2)]
        public string Artist { get; set; } = string.Empty;

        [Index(7)]
        public string Album { get; set; } = string.Empty;

        [Index(21)]
        public string TrackId { get; set; } = string.Empty;

        [Index(25)]
        public string TrackImg { get; set; } = string.Empty;

        [Ignore]
        public string? PlaylistOwner { get; set; }

        public bool Equals(PlaylistRow other)
        {
            if (other.TrackId == TrackId || (other.Song == Song && other.Artist == Artist))
            {
                return true;

            }
            return false;
        }
    }
}
