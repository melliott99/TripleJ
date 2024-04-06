using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Abstractions;
using PlaylistDataProcessor.Models;
using PlaylistDataProcessor.Repository;
using System.Collections.Generic;
using TripleJWebApp.Models;
using TripleJWebApp.Services.Interfaces;

namespace TripleJWebApp.Services
{
    public class MusicService : IMusicService
    {
        private readonly ILogger<MusicService> _logger;
        private readonly DatabaseConnection _connection;
        private readonly IMapper _mapper;

        public MusicService(ILogger<MusicService> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _connection = new DatabaseConnection();
        }

        public async Task<List<Song>> GetAllSongs()
        {
            var result = await _connection.GetAllSongs();
   
            return _mapper.Map<List<PlaylistRow>, List<Song>>(result);
            
        }

        public async Task<IActionResult> SubmitVotes(List<Song> votes, string voter)
        {
            List<VotingRow> votingRows = _mapper.Map< List<Song>, List<VotingRow>>(votes);
            AssignVoterAndPoints(votingRows, voter);
            var result = await _connection.SubmitVotes(votingRows);
            return null;
        }


        private void AssignVoterAndPoints(List<VotingRow> votingRows, string voter)
        {
            int point = 10;
            foreach(VotingRow v in votingRows)
            {
                v.Voter = voter;
                v.Point = point;
                point--;
            }
        }

    }
}
