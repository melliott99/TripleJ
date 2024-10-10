using AutoMapper;
using PlaylistDataProcessor.Models;
using System.Text;
using TripleJWebApp.Mappings.Resolver;
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
                .ForMember(dest => dest.PlaylistOwner, opt => opt.ConvertUsing(new ListToCsvConverter(), src => src.PlaylistOwners))
                .ReverseMap()
                .ForMember(dest => dest.SongName, opt => opt.MapFrom(src => src.Song))
                .ForMember(dest => dest.Artist, opt => opt.MapFrom(src => src.Artist))
                .ForMember(dest => dest.TrackId, opt => opt.MapFrom(src => src.TrackId))
                .ForMember(dest => dest.TrackImg, opt => opt.MapFrom(src => src.TrackImg))
                .ForMember(dest => dest.PlaylistOwners, opt => opt.MapFrom(new CsvToListResolver()));


            CreateMap<VotingRow, Song>()
                .ForMember(dest => dest.SongName, opt => opt.MapFrom(src => src.SongName))
                .ForMember(dest => dest.Artist, opt => opt.MapFrom(src => src.Artist))
                .ForMember(dest => dest.TrackId, opt => opt.MapFrom(src => src.TrackId))
                .ForMember(dest => dest.TrackImg, opt => opt.MapFrom(src => src.TrackImg))
                .ReverseMap();
        }
    }
}
