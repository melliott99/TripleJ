using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using PlaylistDataProcessor.Models;
using System.Data.Common;
using System.Text;

namespace PlaylistDataProcessor.Repository
{
    public class DatabaseConnection
    {
        private static string connectionString = "Server=(LocalDb)\\MSSQLLocalDB;Database=TripleJ;Trusted_Connection=True;";
        private readonly SqlConnection _connection;

        public DatabaseConnection()
        {
            _connection = new SqlConnection(connectionString);
            _connection.Open();
        }


        public async Task<List<PlaylistRow>> GetAllSongs()
        {
            List<PlaylistRow> response = new List<PlaylistRow>();
            try
            {
                SqlCommand command = new SqlCommand("SELECT Song, Artist, Album, TrackId, TrackImg, PlaylistOwner From Songs", _connection);
                SqlDataReader reader = await command.ExecuteReaderAsync();

                while (reader.Read())
                {
                    var row = new PlaylistRow();
                    row.Song = (string)reader["Song"];
                    row.Artist = (string)reader["Artist"];
                    row.TrackId = (string)reader["TrackId"];
                    row.TrackImg = (string)reader["TrackImg"];
                    row.PlaylistOwner = (string)reader["PlaylistOwner"]; 
                    response.Add(row);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.ToString());

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                _connection.Close();
            }

            return response;
        }

        public async Task<bool> SubmitVotes(List<VotingRow> votes)
        {
            bool isSuccessful = false;
            try
            {
                foreach (VotingRow row in votes)
                {
                    string query = new StringBuilder($"INSERT INTO Votes (TrackId, Point, Voter) " +
                    $"VALUES (@TrackId, @Point, @Voter)").ToString();
                    using (SqlCommand command = new SqlCommand(query, _connection))
                    {
                        command.Parameters.AddWithValue("@TrackId", row.TrackId);
                        command.Parameters.AddWithValue("@Point", row.Point);
                        command.Parameters.AddWithValue("@Voter", row.Voter);
                        command.ExecuteNonQuery();
                    }
                }
                isSuccessful = true;
            }
            catch (DbException ex)
            {
                Console.WriteLine(ex.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                _connection.Close();
            }

            return isSuccessful;
        }

        public bool InsertPlaylists(List<PlaylistRow> uniquePlaylistList)
        {
            bool isSuccessful = false;
            try
            {
                foreach(PlaylistRow row in uniquePlaylistList)
                {
                    string query = new StringBuilder($"INSERT INTO Songs (TrackId, Song, Artist, Album, TrackImg, PlaylistOwner) " +
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
                }
                isSuccessful = true;
            }
            catch(DbException ex)
            {
                Console.WriteLine(ex.ToString()); 
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString() );
            }
            finally 
            {
                _connection.Close();            
            }

            return isSuccessful;
        }

        public async Task<string> ValidateUser(string userId)
        {
            string userName = "N/A";
            try
            {
                SqlCommand command = new SqlCommand($"SELECT Name from Users where UserId = @UserId", _connection);
                command.Parameters.AddWithValue("@UserId", userId);

                SqlDataReader reader = await command.ExecuteReaderAsync();

                while (reader.Read())
                {
                    userName = reader["Name"] != DBNull.Value ? (string)reader["Name"] : "N/A";
                };
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.ToString());

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                _connection.Close();
            }

            return userName;
        }
    }
}
