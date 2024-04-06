using AutoMapper;
using PlaylistDataProcessor.Models;
using System.Text;
using TripleJWebApp.Models;

namespace TripleJWebApp.Mappings
{
    public class SongMapper : Profile
    {
        public SongMapper()
        {
            CreateMap<Song, PlaylistRow>()
                .ForMember(dest => dest.Song, opt => opt.MapFrom(src => src.SongName))
                .ForMember(dest => dest.Artist, opt => opt.MapFrom(src => src.Artist))
                .ForMember(dest => dest.TrackId, opt => opt.MapFrom(src => src.TrackId))
                .ForMember(dest => dest.TrackImg, opt => opt.MapFrom(src => src.TrackImg))
                .ReverseMap();


            CreateMap<VotingRow, Song>()
                .ForMember(dest => dest.SongName, opt => opt.MapFrom(src => src.SongName))
                .ForMember(dest => dest.Artist, opt => opt.MapFrom(src => src.Artist))
                .ForMember(dest => dest.TrackId, opt => opt.MapFrom(src => src.TrackId))
                .ForMember(dest => dest.TrackImg, opt => opt.MapFrom(src => src.TrackImg))
                .ReverseMap();
        }
    }
}
