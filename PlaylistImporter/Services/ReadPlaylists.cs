using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;
using System.Text.RegularExpressions;
using PlaylistDataProcessor.Repository;
using Microsoft.Extensions.Logging;
using PlaylistDataProcessor.Models;

namespace PlaylistImporter.Services
{
    public static class ReadPlaylists
    {

        private static string PLAYLIST_DIRECTORY = "C:/\\Users/\\Michael/\\Desktop/\\Playlists";


        public static void BulkImportPlaylist()
        {
            List<PlaylistRow> playlistRows = new List<PlaylistRow>();

            List<PlaylistRow> uniquePlaylist = new List<PlaylistRow>();
            // Get all CSV files in the specified folder
            string[] csvFiles = Directory.GetFiles(PLAYLIST_DIRECTORY, "*.csv");

            foreach (var csvFile in csvFiles)
            {
                List<PlaylistRow> csvData = ReadCsvFile<PlaylistRow>(csvFile);
                AppendFileNameToCsvData(csvData, csvFile);
                playlistRows.AddRange(csvData);
            }
            //Remove any duplicates
            CreateUniquePlaylist(uniquePlaylist, playlistRows);

            foreach (var playlistRow in playlistRows)
            {
                Console.WriteLine($"Column1: {playlistRow.Song}, Column2: {playlistRow.Artist}, FileName: {playlistRow.PlaylistOwner}");
            }

            DatabaseConnection _repoConnection = new DatabaseConnection();
            var isSuccessful =  _repoConnection.InsertPlaylists(uniquePlaylist);

        }

        private static void CreateUniquePlaylist(List<PlaylistRow> uniquePlaylist, List<PlaylistRow> playlistRows)
        {
            for (int i = 0; i < playlistRows.Count; i++)
            {
                PlaylistRow currentPlaylistRow = playlistRows[i];
                bool isDuplicate = false;

                // Check for duplicates with elements after the current one
                for (int j = i + 1; j < playlistRows.Count; j++)
                {
                    if (currentPlaylistRow.Equals(playlistRows[j]))
                    {
                        isDuplicate = true;
                        playlistRows[j].PlaylistOwner = 
                            new StringBuilder(currentPlaylistRow.PlaylistOwner + "," + 
                                                playlistRows[j].PlaylistOwner).ToString();

                        break;
                    }
                }

                // Add to uniquePlaylists if not a duplicate
                if (!isDuplicate)
                {
                    uniquePlaylist.Add(currentPlaylistRow);
                }
            }

        }

        private static List<T> ReadCsvFile<T>(string filePath)
        {
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                return csv.GetRecords<T>().ToList();
            }
        }

        private static void AppendFileNameToCsvData(List<PlaylistRow> csvData, string fileName)
        {
            string pattern = @"\\([^\\]+)\.csv";
            foreach (var row in csvData)
            {
                Match match = Regex.Match(fileName, pattern);
                row.PlaylistOwner = match.Groups[1].Value;
            }
        }

    }
}
