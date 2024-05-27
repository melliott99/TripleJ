using AutoMapper;
using PlaylistDataProcessor.Models;
using TripleJWebApp.Models;

namespace TripleJWebApp.Mappings.Resolver
{
    public class CsvToListResolver : IValueResolver<PlaylistRow, Song, List<string>>
    {
        public List<string> Resolve(PlaylistRow source, Song destination, List<string> destMember, ResolutionContext context)
        {
            return source.PlaylistOwner?.Split(',').ToList() ?? new List<string>();
        }
    }
}
