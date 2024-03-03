using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using PlaylistDataProcessor.Models;
using System.Text;

namespace PlaylistDataProcessor.Repository
{
    public class RepositoryConnection
    {
        private static string connectionString = "Server=(LocalDb)\\MSSQLLocalDB;Database=TripleJ;Trusted_Connection=True;";

        private readonly ILogger<RepositoryConnection>? _logger;
        private readonly SqlConnection _connection;

        public RepositoryConnection()
        {
            _connection = new SqlConnection(connectionString);
            _connection.Open();
        }
        
        public RepositoryConnection(ILogger<RepositoryConnection> logger)
        {
            _connection =  new SqlConnection(connectionString);
            _connection.Open();
            _logger = logger;
        }

        public bool InsertPlaylists(List<PlaylistRow> uniquePlaylistList)
        {
            bool isSuccessful = false;
            try
            {
                foreach(PlaylistRow row in uniquePlaylistList)
                {
                    string query = new StringBuilder($"INSERT INTO SongTable (TrackId, Song, Artist, Album, TrackImg, PlaylistOwner) " +
                    $"VALUES (@TrackId, @Song, @Artist, @Album, @TrackImg, @PlaylistOwner)").ToString();
                    using (SqlCommand command = new SqlCommand(query, _connection))
                    {
                        command.Parameters.AddWithValue("@TrackId", row.TrackId);
                        command.Parameters.AddWithValue("@Song", row.Song);
                        command.Parameters.AddWithValue("@Artist", row.Artist);
                        command.Parameters.AddWithValue("@Album", row.Album);
                        command.Parameters.AddWithValue("@TrackImg", row.TrackImg);
                        command.Parameters.AddWithValue("@PlaylistOwner", row.PlaylistOwner);
                        command.ExecuteNonQuery();
                    }
                   //_logger.LogInformation(query);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.ToString());
                //_logger.LogError(ex.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString() );
                //_logger.LogError(ex.ToString());
            }
            finally 
            {
                _connection.Close();            
            }

            return isSuccessful;
        }
    }
}
