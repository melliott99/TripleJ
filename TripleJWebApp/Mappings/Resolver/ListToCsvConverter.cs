using AutoMapper;

namespace TripleJWebApp.Mappings.Resolver
{
    public class ListToCsvConverter : IValueConverter<List<string>, string>
    {
        public string Convert(List<string> sourceMember, ResolutionContext context)
        {
            return sourceMember != null ? string.Join(",", sourceMember) : string.Empty;
        }
    }
}
